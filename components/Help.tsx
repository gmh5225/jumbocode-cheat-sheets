"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ben from "../app/(site)/ben.png";

export default function Help() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={(value) => setOpen(value)}>
      <Dialog.Trigger className="block bg-teal-700 px-3 py-2 w-max fixed right-2 bottom-2 shadow">
        <div className="flex items-center gap-x-2">
          <img src="https://emojicdn.elk.sh/👋" alt="" className="w-4" />
          <p className="font-headings text-white font-semibold">
            Have questions?
          </p>
        </div>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-gray-900/30"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className={clsx(
                  "fixed right-x-0 bottom-0 sm:right-2 sm:bottom-2 shadow bg-teal-700 p-4",
                  "w-full sm:w-96"
                )}
              >
                <div className="flex items-start gap-x-4">
                  <Image
                    src={ben}
                    alt=""
                    width={65}
                    className="bg-white/10 rounded-full w-[65px] h-[65px]"
                  />
                  <div className="text-white font-body space-y-3">
                    <p>
                      Hi! I’m{" "}
                      <a
                        href="https://benborgers.com"
                        target="_blank"
                        className="underline decoration-white/60"
                      >
                        Ben Borgers
                      </a>
                      , I wrote these cheat sheets for the 2023-2024 year of{" "}
                      <a
                        href="https://jumbocode.org"
                        target="_blank"
                        className="underline decoration-white/60"
                      >
                        JumboCode
                      </a>
                      .
                    </p>
                    <p>
                      If you have any questions about programming, feel free to{" "}
                      <a
                        href="https://app.slack.com/client/T0593U0H0T0/D058WHGFDJT"
                        target="_blank"
                        className="underline decoration-white/60 inline-block"
                      >
                        send me a message on Slack
                      </a>
                      !{" "}
                      <span className="inline-block text-white/50">
                        (do it do it i’m happy to answer)
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
