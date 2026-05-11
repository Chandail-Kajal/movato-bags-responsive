/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/validation.ts
import * as Yup from "yup";
import { api } from "@/lib/api";
import { useFormik } from "formik";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ReactNode } from "react";

export const heroSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    primaryBtn: Yup.string().required("Primary button required"),
    secondaryBtn: Yup.string().required("Secondary button required"),
});



export const HeroForm = ({ editItem, onClose, refresh, items }: any) => {
    const formik = useFormik({
        initialValues: {
            image: "",
            title: editItem?.title || "",
            description: editItem?.description || "",
            primaryBtn: editItem?.primaryBtn || "",
            secondaryBtn: editItem?.secondaryBtn || "",
        },
        validationSchema: heroSchema,
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
                    await api.put("/api/admin/sections/hero", formData);
                } else {
                    formData.append("order", String(items.length));
                    await api.post("/api/admin/sections/hero", formData);
                }

                refresh();
                onClose();
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-3">

            {typeof formik.values.image === "string" &&
                formik.values.image && (
                    <Image
                        height={50}
                        width={50}
                        alt="preview"
                        src={formik.values.image}
                        className="w-full h-32 object-cover rounded"
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
                placeholder="Title"
                {...formik.getFieldProps("title")}
            />
            <p className="text-red-500 text-xs">{formik.errors.title as ReactNode}</p>

            <Input
                placeholder="Description"
                {...formik.getFieldProps("description")}
            />
            <p className="text-red-500 text-xs">{formik.errors.description as ReactNode}</p>

            <Input
                placeholder="Primary Button"
                {...formik.getFieldProps("primaryBtn")}
            />

            <Input
                placeholder="Secondary Button"
                {...formik.getFieldProps("secondaryBtn")}
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};