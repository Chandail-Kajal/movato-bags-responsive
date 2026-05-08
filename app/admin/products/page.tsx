/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/products/page.tsx
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

const productSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();

    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      price: "",
    },

    validationSchema: productSchema,

    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]: any) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else {
          formData.append(key, value);
        }
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

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/products?id=${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div className="p-6">

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

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
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

                <TableCell>{item.name}</TableCell>

                <TableCell>{item.description}</TableCell>

                <TableCell>₹{item.price}</TableCell>

                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditItem(item);

                      formik.setValues({
                        image: item.image,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                      });

                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              {editItem ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4"
          >
            {typeof formik.values.image === "string" &&
              formik.values.image && (
                <Image
                  src={formik.values.image}
                  alt="preview"
                  width={100}
                  height={100}
                  className="rounded"
                />
              )}

            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  formik.setFieldValue("image", file);
                }
              }}
            />

            <Input
              placeholder="Product Name"
              {...formik.getFieldProps("name")}
            />

            <p className="text-red-500 text-sm">
              {formik.errors.name as string}
            </p>

            <Input
              placeholder="Description"
              {...formik.getFieldProps("description")}
            />

            <p className="text-red-500 text-sm">
              {formik.errors.description as string}
            </p>

            <Input
              type="number"
              placeholder="Price"
              {...formik.getFieldProps("price")}
            />

            <p className="text-red-500 text-sm">
              {formik.errors.price as string}
            </p>

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