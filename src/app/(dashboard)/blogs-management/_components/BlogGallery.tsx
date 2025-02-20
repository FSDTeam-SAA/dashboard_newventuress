"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Trash2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// type BlogGalleryProps = {
//   setFiles: React.Dispatch<React.SetStateAction<string[]>>
// }

interface BlogGalleryProps {
  setFiles: (files: string[]) => void;
  image?: string; // Ensure image prop is defined
}

 
/*************  ✨ Codeium Command ⭐  *************/
/******  9c17b9d6-2bf5-45f6-b713-283217f7fb04  *******/
export default function BlogGallery({ setFiles, image }: BlogGalleryProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(image || null) // Use `image` as initial preview
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0] // Get only the first file

    if (droppedFile && (droppedFile.type.startsWith("image/jpeg") || droppedFile.type.startsWith("image/png"))) {
      const previewURL = URL.createObjectURL(droppedFile)
      setFileName(droppedFile.name)
      setFilePreview(previewURL)
      setFiles([previewURL]) // Store the preview URL instead of just the name
    }
  }
  console.log(fileName)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0]

      if (selectedFile && (selectedFile.type.startsWith("image/jpeg") || selectedFile.type.startsWith("image/png"))) {
        const previewURL = URL.createObjectURL(selectedFile)
        setFileName(selectedFile.name)
        setFilePreview(previewURL)
        setFiles([previewURL])
      }
    }
  }

  const removeImage = () => {
    setFileName(null)
    setFilePreview(null)
    setFiles([])
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Blog Gallery</h2>

      {/* Drop Zone */}
      <div
        className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {filePreview ? (
          <div className="relative group w-[270px] 2xl:w-[470px]">
            <div className="w-[270px] 2xl:w-full h-24 bg-gray-300 flex items-center justify-center rounded-lg">
              <Image
                src={filePreview}
                alt="Preview"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            </div>
            <button className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm z-10" onClick={removeImage}>
              <Trash2 className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-600">Drop your image here, or browse</p>
            <p className="text-sm text-gray-500">Jpeg, png are allowed</p>
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          ref={fileInputRef}
        />
      </div>

      {/* Buttons Below the Drop Zone */}
      <div className="flex gap-4 justify-end mt-4">
        <Button className="text-gradient border border-[#121D42] py-2 px-6 text-base font-medium leading-5" type="button" variant="outline">
          Update
        </Button>
        <Button type="button" className="px-8 py-2 text-base font-medium leading-5 bg-gradient-to-r from-[#121D42] via-[#152764] to-[#4857BD] hover:from-[#7091FF] hover:via-[#2F4697] hover:to-[#7485FB] text-white">
          Confirm
        </Button>
      </div>
    </div>
  )
}


