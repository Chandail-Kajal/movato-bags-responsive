/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ShopSecitonForm } from "@/components/forms/ShopSectionForm";
import Image from "next/image";

type CategoryType = {
  _id: string;
  name: string;
};

type Category = {
  _id: string;
  name: string;
};

type ItemType = {
  _id: string;
  image: string;
  isActive: boolean;
  order: number;

  categoryType: CategoryType;
  categories: Category[];

  buttonTitle?: string;
  caption?: string;
};

export function ShopSectionAdmin() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [original, setOriginal] = useState<ItemType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<ItemType | null>(null);

  const fetchItems = async () => {
    const { data } = await api.get("/api/admin/sections/shop");
    setItems(data.data || []);
    setOriginal(data.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const isChanged =
    JSON.stringify(items.map((i) => i._id)) !==
    JSON.stringify(original.map((i) => i._id));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(items);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setItems(updated.map((item, index) => ({ ...item, order: index })));
  };

  const saveOrder = async () => {
    await api.put("/api/admin/sections/shop/reorder", {
      items: items.map((item, index) => ({
        id: item._id,
        order: index,
      })),
    });

    fetchItems();
  };

  const toggleActive = async (item: ItemType) => {
    setItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, isActive: !i.isActive } : i
      )
    );

    await api.patch("/api/admin/sections/shop", {
      id: item._id,
      isActive: !item.isActive,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete item?")) return;

    await api.delete(`/api/admin/sections/shop?id=${id}`);

    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const openAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (item: ItemType) => {
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <div className="p-6 w-full min-h-screen bg-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Shop Sections</h1>

        <div className="flex gap-2">
          {isChanged && (
            <Button onClick={saveOrder} className="bg-green-500">
              Save Order
            </Button>
          )}

          <Button onClick={openAdd}>+ Add</Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-4 mb-3 shadow rounded"
                    >
                      <div {...provided.dragHandleProps}>☰</div>

                      <Image
                        height={80}
                        width={120}
                        alt=""
                        src={item.image}
                        className="w-32 h-20 object-cover rounded"
                      />

                    
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          {item.categoryType?.name}
                        </span>

                        <div className="flex gap-1 flex-wrap">
                          {item.categories?.map((cat) => (
                            <span
                              key={cat._id}
                              className="text-xs bg-gray-200 px-2 py-1 rounded"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>

                        {item.caption && (
                          <span className="text-sm text-gray-500">
                            {item.caption}
                          </span>
                        )}
                      </div>

                   
                      <div
                        onClick={() => toggleActive(item)}
                        className={`ml-auto w-10 h-5 flex items-center p-1 rounded-full cursor-pointer ${
                          item.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full ${
                            item.isActive ? "translate-x-5" : ""
                          }`}
                        />
                      </div>

                      <Button onClick={() => openEdit(item)}>Edit</Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editItem ? "Edit Section" : "Add Section"}
            </DialogTitle>
          </DialogHeader>

          <ShopSecitonForm
            editItem={editItem}
            onClose={() => setShowModal(false)}
            refresh={fetchItems}
            items={items}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}