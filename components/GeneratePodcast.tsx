import React from "react";
import { Label } from "./ui/label";

interface GeneratePodcastProps {
  setAudioStorageId: any;
  setAudio: any;
  voiceType: any;
  audio: any;
  voicePrompt: any;
  setVoicePrompt: any;
  setAudioDuration: any;
}
const GeneratePodcast = ({
  setAudioStorageId,
  setAudio,
  voiceType,
  audio,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label>

        </Label>
      </div>
    </div>
  );
};

export default GeneratePodcast;
