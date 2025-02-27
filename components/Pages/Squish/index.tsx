import { useState } from "react";
import SquishFileInput from "./FineInput";
import Squisher from "./Squisher";
import { Button } from "@/components/ui/button";
import {File} from 'lucide-react';

const SquishPage = () => {
  const [files, setFiles] = useState<FileList>();

  //@ts-ignore
  return (
    <div className="p-3">
      {!files && <SquishFileInput onFileSelect={(files) => setFiles(files)} />}

      {files && (
        <>
          <Squisher files={files ?? []} />
          <Button onClick={() => setFiles(undefined)} color="blue" size="lg" className="w-full" variant="outline">
            <File />
            Take an another file
          </Button>
        </>
      )}
    </div>
  );
};

export default SquishPage;
