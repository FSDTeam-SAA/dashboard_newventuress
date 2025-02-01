"use client";

import { useRef, useState } from "react";
import { Trash2, Plus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BlogGallery() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const imageFiles = selectedFiles.filter(
        (file) =>
          file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
      );
      setFiles((prev) => [...prev, ...imageFiles]);
    }
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Blog Gallery</h2>

      
      <div
        className="relative border-2 border-dashed rounded-lg py-[16px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <p className="text-sm text-gray-600">Drop your images here, or browse</p>
          <p className="text-sm text-gray-500">Jpeg, png are allowed</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            multiple
            ref={fileInputRef}
          />
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-4 mb-4">
        {files.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="relative group">
              <Image
                src={imageUrl}
                alt={file.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white rounded-lg"
          onClick={handlePlusClick}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-[17px] justify-end">
        <Button className="text-gradient border border-[#121D42] py-[12px] px-[24px] text-base font-medium leading-[19px]" type="button" variant="outline">
          Update
        </Button>
        <Button type="button" className="px-[58px] py-[12px] text-base font-medium leading-[19px] bg-gradient-to-r from-[#121D42] via-[#152764] to-[#4857BD] hover:from-[#7091FF] hover:via-[#2F4697] hover:to-[#7485FB] text-white">
          Confirm
        </Button>
      </div>
    </div>
  );
}
