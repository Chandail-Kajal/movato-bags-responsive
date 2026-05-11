/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { MultiSelect } from "@/components/multi-select";

const productSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required(
    "Description is required"
  ),
  price: Yup.number().required(
    "Price is required"
  ),
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [open, setOpen] = useState(false);

  const [editItem, setEditItem] =
    useState<any>(null);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");

    const data = await res.json();

    setProducts(data.data);
  };

  // ================= FETCH CATEGORIES =================

  const fetchCategories = async () => {
    const res = await fetch(
      "/api/admin/categories"
    );

    const data = await res.json();

    setCategories(data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= FORMIK =================

  const formik = useFormik({
    initialValues: {
      image: "" as any,
      name: "",
      description: "",
      price: "",
      categories: [] as string[],
    },

    validationSchema: productSchema,

    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("name", values.name);

      formData.append(
        "description",
        values.description
      );

      formData.append(
        "price",
        values.price.toString()
      );

      // IMAGE
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      // CATEGORIES
      values.categories.forEach((id) => {
        formData.append("categories", id);
      });

      try {
        if (editItem) {
          formData.append("id", editItem._id);

          await fetch("/api/admin/products", {
            method: "PUT",
            body: formData,
          });
        } else {
          await fetch("/api/admin/products", {
            method: "POST",
            body: formData,
          });
        }

        fetchProducts();

        setOpen(false);

        setEditItem(null);

        formik.resetForm();

      } catch (error) {
        console.log(error);
      }
    },
  });

  // ================= DELETE =================

  const handleDelete = async (id: string) => {
    await fetch(
      `/api/admin/products?id=${id}`,
      {
        method: "DELETE",
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Button
          onClick={() => {
            setEditItem(null);

            formik.resetForm();

            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {/* TABLE */}

      <div className="border rounded-xl overflow-hidden">
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>

              <TableHead>Name</TableHead>

              <TableHead>Description</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Categories</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((item: any) => (
              <TableRow key={item._id}>

                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </TableCell>

                <TableCell>
                  {item.name}
                </TableCell>

                <TableCell>
                  {item.description}
                </TableCell>

                <TableCell>
                  ₹{item.price}
                </TableCell>

                {/* CATEGORY NAMES */}

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.categories?.map(
                      (cat: any) => (
                        <span
                          key={cat._id}
                          className="px-2 py-1 text-xs bg-gray-100 rounded"
                        >
                          {cat.name}
                        </span>
                      )
                    )}
                  </div>
                </TableCell>

                {/* ACTIONS */}

                <TableCell className="space-x-2">

                  <Button
                    variant="outline"
                    onClick={() => {

                      setEditItem(item);

                      formik.setValues({
                        image: item.image,
                        name: item.name,
                        description:
                          item.description,
                        price: item.price,

                        categories:
                          item.categories?.map(
                            (cat: any) =>
                              cat._id
                          ) || [],
                      });

                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>

      {/* DIALOG */}

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              {editItem
                ? "Edit Product"
                : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4"
          >

            {/* IMAGE PREVIEW */}

            {typeof formik.values.image ===
              "string" &&
              formik.values.image && (
                <Image
                  src={formik.values.image}
                  alt="preview"
                  width={100}
                  height={100}
                  className="rounded"
                />
              )}

            {/* IMAGE */}

            <Input
              type="file"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  formik.setFieldValue(
                    "image",
                    file
                  );
                }
              }}
            />

            {/* NAME */}

            <Input
              placeholder="Product Name"
              {...formik.getFieldProps(
                "name"
              )}
            />

            <p className="text-red-500 text-sm">
              {formik.errors.name as string}
            </p>

            {/* DESCRIPTION */}

            <Input
              placeholder="Description"
              {...formik.getFieldProps(
                "description"
              )}
            />

            <p className="text-red-500 text-sm">
              {
                formik.errors
                  .description as string
              }
            </p>

            {/* PRICE */}

            <Input
              type="number"
              placeholder="Price"
              {...formik.getFieldProps(
                "price"
              )}
            />

            <p className="text-red-500 text-sm">
              {formik.errors.price as string}
            </p>

            {/* MULTISELECT CATEGORIES */}

            <div>

              <label className="text-sm font-medium mb-2 block">
                Categories
              </label>

              <MultiSelect
                options={categories.map((cat: any) => ({
                  label: cat.name,
                  value: cat._id,
                }))}

                selected={formik.values.categories}

                onChange={(value) =>
                  formik.setFieldValue(
                    "categories",
                    value
                  )
                }

                placeholder="Select Categories"
              />

            </div>

            {/* SUBMIT */}

            <div className="flex justify-end">
              <Button type="submit">
                Save Product
              </Button>
            </div>

          </form>

        </DialogContent>
      </Dialog>
    </div>
  );
}