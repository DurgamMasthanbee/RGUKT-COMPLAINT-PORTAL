import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

export default function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10, // MB
  acceptedFormats = ["jpg", "jpeg", "png", "pdf"],
}) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(
        `Only ${acceptedFormats.join(", ").toUpperCase()} files are allowed`
      );
      return false;
    }

    return true;
  };

  const handleFiles = (newFiles) => {
    setError("");

    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    let validFiles = [];
    for (let file of newFiles) {
      if (validateFile(file)) {
        validFiles.push({
          file,
          preview: generatePreview(file),
          id: Math.random(),
        });
      }
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesSelected(updatedFiles.map((f) => f.file));
    }
  };

  const generatePreview = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      return URL.createObjectURL(file);
    }

    return null;
  };

  const removeFile = (id) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles.map((f) => f.file));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const newFiles = [...e.dataTransfer.files];
    handleFiles(newFiles);
  };

  const handleChange = (e) => {
    const newFiles = [...e.target.files];
    handleFiles(newFiles);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        animate={{
          borderColor: dragActive ? "#3b82f6" : "rgba(255, 255, 255, 0.1)",
          backgroundColor: dragActive ? "rgba(59, 130, 246, 0.05)" : "rgba(255, 255, 255, 0.05)",
        }}
        className="rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-8 text-center transition-all duration-300 cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.map((f) => `.${f}`).join(",")}
          onChange={handleChange}
          className="hidden"
        />

        <motion.div
          animate={{ scale: dragActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
            <Upload size={32} className="text-white" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Drag & drop files here
            </h3>
            <p className="text-sm text-slate-400">
              or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-400 hover:text-blue-300 font-semibold transition"
              >
                click to browse
              </button>
            </p>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            📁 Supported: {acceptedFormats.join(", ").toUpperCase()} • Max size:{" "}
            {maxSize}MB • Max files: {maxFiles}
          </p>
        </motion.div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Files List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className="text-sm font-semibold text-slate-300 mb-4">
            📎 Attached Files ({files.length}/{maxFiles})
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {files.map((fileObj, index) => (
                <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <div className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden aspect-square flex flex-col items-center justify-center p-4 hover:border-white/30 transition">
                    {/* Image Preview */}
                    {fileObj.preview && (
                      <img
                        src={fileObj.preview}
                        alt={fileObj.file.name}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* File Type Icon */}
                    {!fileObj.preview && (
                      <div className="text-center">
                        {fileObj.file.name.endsWith(".pdf") ? (
                          <FileText size={32} className="text-red-400 mx-auto mb-2" />
                        ) : (
                          <ImageIcon size={32} className="text-blue-400 mx-auto mb-2" />
                        )}
                        <p className="text-xs text-slate-300 truncate line-clamp-2">
                          {fileObj.file.name}
                        </p>
                      </div>
                    )}

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={16} className="text-white" />
                    </motion.button>
                  </div>

                  {/* File Name */}
                  <p className="text-xs text-slate-400 mt-2 truncate">
                    {fileObj.file.name}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
