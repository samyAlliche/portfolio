"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  ClipboardCheck,
  ClipboardCopy,
  Download,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const HireMeButtons = () => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);
  const handleDownload = () => {
    setIsDownloading(true);
    toast("Downloading CV...", {
      duration: 4000,
      description: "Thanks for your consideration!",
    });
    setTimeout(() => {
      setIsDownloading(false);
    }, 4000);
  };
  const handleCopy = () => {
    setIsCopying(true);
    navigator.clipboard.writeText("samy.alliche.22@gmail.com");
    toast.success(
      <p className=" font-bold">My email has been copied to your clipboard.</p>,
      {
        duration: 4000,
        description: "Hope to hear from you soon!",
      }
    );
    setTimeout(() => {
      setIsCopying(false);
    }, 4000);
  };
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:w-fit w-3/4 justify-center">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="sm:w-2/3 w-full flex"
        onClick={() => handleDownload()}
        disabled={isDownloading}
      >
        <a
          href="/Samy Alliche - CV 2025 EN.pdf"
          download
          className="flex items-center gap-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isDownloading ? (
              <motion.span
                key="download"
                initial={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <Download /> Download CV
              </motion.span>
            ) : (
              <motion.span
                key="downloading"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <FileCheck />
                CV Downloaded
              </motion.span>
            )}
          </AnimatePresence>
        </a>
      </Button>
      <Button
        size="lg"
        className="sm:w-2/3 w-full flex"
        onClick={() => {
          handleCopy();
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isCopying ? (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <ClipboardCopy /> Copy My Email
            </motion.span>
          ) : (
            <motion.span
              key="copied"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2"
            >
              <ClipboardCheck />
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
};

export default HireMeButtons;
