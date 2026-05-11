/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = Yup.object({
  categoryType: Yup.string().required("Category type is required"),
  categories: Yup.array().min(1, "Select at least one category"),
});

export const ShopSecitonForm = ({
  editItem,
  onClose,
  refresh,
  items,
}: any) => {
  const [types, setTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const fetchTypes = async () => {
    const res = await api.get("/api/admin/category-types");
    setTypes(res.data.data || []);
  };

  const fetchCategories = async (typeId: string) => {
    const res = await api.get(`/api/admin/categories?type=${typeId}`);
    setCategories(res.data.data || []);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      image: editItem?.image || "",
      categoryType: editItem?.categoryType?._id || "",
      categories: editItem?.categories?.map((c: any) => c._id) || [],
      buttonTitle: editItem?.buttonTitle || "",
      caption: editItem?.caption || "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      const formData = new FormData();

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      formData.append("categoryType", values.categoryType);

      values.categories.forEach((catId: string) => {
        formData.append("categories", catId);
      });

      formData.append("buttonTitle", values.buttonTitle);
      formData.append("caption", values.caption);

      try {
        if (editItem) {
          formData.append("id", editItem._id);
          await api.put("/api/admin/sections/shop", formData);
        } else {
          formData.append("order", String(items.length));
          await api.post("/api/admin/sections/shop", formData);
        }

        refresh();
        onClose();
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (formik.values.categoryType) {
      fetchCategories(formik.values.categoryType);
    }
  }, [formik.values.categoryType]);

  const toggleCategory = (id: string) => {
    const selected = formik.values.categories;

    if (selected.includes(id)) {
      formik.setFieldValue(
        "categories",
        selected.filter((c: string) => c !== id)
      );
    } else {
      formik.setFieldValue("categories", [...selected, id]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {typeof formik.values.image === "string" &&
        formik.values.image && (
          <Image
            height={100}
            width={200}
            alt="preview"
            src={formik.values.image}
            className="w-full h-32 object-cover rounded"
          />
        )}

      <Input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) formik.setFieldValue("image", file);
        }}
      />

      <Select
        value={formik.values.categoryType}
        onValueChange={(value) =>
          formik.setFieldValue("categoryType", value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category type" />
        </SelectTrigger>

        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type._id} value={type._id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const selected = formik.values.categories.includes(cat._id);

            return (
              <button
                type="button"
                key={cat._id}
                onClick={() => toggleCategory(cat._id)}
                className={`px-3 py-1 rounded border ${
                  selected
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      {formik.errors.categories && (
        <p className="text-red-500 text-sm">
          {formik.errors.categories as string}
        </p>
      )}

      <Input
        placeholder="Button Title"
        {...formik.getFieldProps("buttonTitle")}
      />

      {/* CAPTION */}
      <Input
        placeholder="Caption"
        {...formik.getFieldProps("caption")}
      />

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};