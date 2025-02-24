

import { forwardRef, ChangeEvent } from "react";

const TextArea = forwardRef<HTMLTextAreaElement, { onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void }>(
  ({ onChange }, ref) => {
    return (
      <div className="w-full mt-4 mb-4">
        <div className="flex items-center justify-between px-3">
          <div className="py-2 bg-transparent rounded-b-lg w-full">
            <textarea
              ref={ref}
              onChange={onChange}
              id="editor"
              rows={8}
              className="block shadow-md w-full text-sm p-3 rounded-md text-gray-800 bg-white border-b focus:outline-none"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    );
  }
);

export default TextArea;
