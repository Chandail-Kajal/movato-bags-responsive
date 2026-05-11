/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { HeroForm } from "@/components/forms/HeroForm";
import { api } from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type HeroType = {
  _id: string;
  image: string;
  title: string;
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  isActive: boolean;
  order: number;
};

export function HeroAdmin() {
  const [items, setItems] = useState<HeroType[]>([]);
  const [original, setOriginal] = useState<HeroType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<HeroType | null>(null);

  const fetchItems = async () => {
    try {
      const { data } = await api.get("/api/admin/sections/hero");
      setItems(data.data || []);
      setOriginal(data.data || []);
    } catch (error) {
      console.error(error);
    }
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

    setItems(
      updated.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
  };

  const saveOrder = async () => {
    await api.put("/api/admin/sections/hero/reorder", {
      items: items.map((item, index) => ({
        id: item._id,
        order: index,
      })),
    });

    fetchItems();
  };

  const toggleActive = async (item: HeroType) => {
    await api.patch("/api/admin/sections/hero", {
      id: item._id,
      isActive: !item.isActive,
    });

    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete item?")) return;

    await api.delete(`/api/admin/sections/hero?id=${id}`);
    fetchItems();
  };

  const openAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (item: HeroType) => {
    setEditItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <div className="p-6 mx-auto w-full min-h-screen bg-white text-gray-800">
      
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Hero Banner Admin</h1>

        <div className="flex gap-2">
          {isChanged && (
            <button
              onClick={saveOrder}
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Save Order
            </button>
          )}

          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            + Add
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white shadow rounded-xl p-3 mb-4 flex items-center gap-3"
                    >
                      
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab text-gray-400"
                      >
                        ☰
                      </div>

                      
                      <img
                        src={item.image}
                        className="w-28 h-16 object-cover rounded"
                        alt=""
                      />

                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      
                      <div
                        onClick={() => toggleActive(item)}
                        className={`ml-auto w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${item.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow transform ${item.isActive ? "translate-x-5" : ""
                            }`}
                        />
                      </div>

                  
                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => openEdit(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
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
              {editItem ? "Edit Banner" : "Add Banner"}
            </DialogTitle>
          </DialogHeader>

          <HeroForm
            editItem={editItem}
            onClose={closeModal}
            refresh={fetchItems}
            items={items}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}