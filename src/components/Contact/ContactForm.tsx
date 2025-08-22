"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, SendHorizonal } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Invalid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000),
});

type FormValues = z.infer<typeof formSchema>;
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      toast.success(<p className="font-bold">Your message has been sent!</p>, {
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      toast.error("Something went wrong.", {
        description: "Please try again in a moment.",
      });
      setTimeout(() => setStatus("idle"), 1500);
    }
  }

  const isSending = status === "sending";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        aria-busy={isSending}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What&apos;s your name?</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  autoComplete="name"
                  disabled={isSending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                How would you like me to address you?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What&apos;s your email?</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isSending}
                  {...field}
                />
              </FormControl>
              <FormDescription>So that I can get back to you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I'm very interested in your profile and I'd love to hire you"
                  autoComplete="off"
                  rows={6}
                  disabled={isSending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          size="lg"
          disabled={isSending}
          aria-disabled={isSending}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status !== "success" ? (
              <motion.span
                key={isSending ? "sending" : "submit"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {isSending ? "Sending…" : "Send message"}
                <SendHorizonal />
              </motion.span>
            ) : (
              <motion.span
                key="sent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <CheckCircle />
                Message sent!
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </Form>
  );
}
