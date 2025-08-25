"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"

const voiceCategory = ['alloy', 'shimmer','nova','echo','fable','onyx']

const formSchema = z.object({
  PodcastTitle: z.string().min(2),
  PodcastDescription: z.string().min(2),
})

const CreatePodcast = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');

  const [isSumbitting, setIsSumbitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PodcastTitle: " ",
      PodcastDescription: " ",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="mt-10 flex flex-col ">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-black-5 border-b pb-10">
            <FormField
              control={form.control}
              name="PodcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="CBStack Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none text-gray-1 bg-black-1"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none text-bold bg-black-1 focus:ring-orange-1">
                  {voiceCategory.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="focus:bg-orange-1 capitalize text-white-1"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>

                {voiceType && (
                  <audio src={`${voiceType}.mp3`} autoPlay className="hidden" />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="PodcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Write a short podcast description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
              <GeneratePodcast 
                setAudioStorageId={setAudioStorageId}
                setAudio={setAudioUrl}
                voiceType={voiceType}
                audio={audioUrl}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              
              />

              <GenerateThumbnail />

              <div className="mt-10 w-full">
                <Button 
                  type="submit" 
                  className="text-16 w-full bg-orange-1 py-4 text-white-1 transition-all duration-500 font-extrabold hover:bg-black-1"
                >
                  {isSumbitting ? (
                    <>
                      Submitting
                    <Loader size={20} className="animate-spin ml-2"/>
                    </>
                  ) : (
                    'Submit & Publish Podcast'
                  )}
                </Button>
              </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default CreatePodcast;