import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FC, useRef, useState } from "react";
import { File } from "lucide-react";

interface SquishFileInputProps {
  onFileSelect: (files: FileList) => void;
}

const SquishFileInput: FC<SquishFileInputProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onFileSelect } = props;

  const [hasInvalidNumberOfFiles, setHasInvalidNumberOfFiles] = useState(false);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length !== 2) {
      setHasInvalidNumberOfFiles(true);
      return;
    }

    if (files) onFileSelect(files);
  };

  return (
    <div className="rounded-md">
      <div className="!my-2">
        <p className="text-2xl">Take your files</p>
        <p className="text-sm text-gray-400">grab two images from your gallery and make a transition between them!</p>
      </div>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-1 border-gray-600 rounded-lg p-3 h-[300px] flex justify-center items-center flex-col gap-4 cursor-pointer"
      >
        <File size="30" color="gray" />
        <div className="flex flex-col justify-center items-center">
          <p>Click to browse</p>
          <p className="text-sm text-gray-600">png, jpg</p>
        </div>
        <Input
          ref={fileInputRef}
          onChange={handleSubmit}
          onSelect={handleSubmit}
          onSubmit={handleSubmit}
          multiple
          name="squish"
          type="file"
          className="!px-3 !py-1 hidden"
        />
      </div>
      {hasInvalidNumberOfFiles && (
        <Alert className="my-3" variant="destructive">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You must provide exactly two images</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SquishFileInput;
