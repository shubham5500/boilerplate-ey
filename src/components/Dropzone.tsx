import React, { useState, useRef } from "react"

interface DropzoneProps {
  multiple: boolean,
  onSelect?: any;
}

const Dropzone: React.FC<DropzoneProps> = ({multiple, onSelect}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
      onSelect([...files, ...droppedFiles])
    } else {
      setFiles(droppedFiles)
      onSelect([...files, ...droppedFiles])
    }
    
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files) as File[]
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
      onSelect([...files, ...selectedFiles])
    } else {
      setFiles(selectedFiles)
      onSelect([...files, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onSelect(newFiles)
  }

  return (
    <div
      className="border-dashed border-2 border-gray-300 py-6 px-3 text-center rounded-lg mb-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={(e) => {
        e.stopPropagation()
        fileInputRef.current?.click()
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <p className="text-gray-600">
        Drop image files here or click to select
      </p>
      <div className="grid grid-cols-2 gap-4">
        {files.map((file, index) => (
          <div key={index}>
            <p>{file.name}</p>
            {file.type.startsWith("image/") && (
              <div>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-auto"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="mt-2 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropzone
