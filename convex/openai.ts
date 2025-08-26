"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.optional(v.string()), // ✅ voice can be null or undefined
  },
  handler: async (_, { voice = "alloy", input }) => {
    // ✅ default voice
    const speechFile = path.resolve("./speech.mp3");

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input,
      instructions: "Speak in a cheerful and positive tone.",
    });

    const buffer = await mp3.arrayBuffer();
    return buffer;
  },
});
