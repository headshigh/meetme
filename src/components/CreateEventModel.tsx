import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { api } from "n/utils/api";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
export default function CreateEventModel({
  openWindow,
  setOpenWindow,
}: {
  openWindow: boolean;
  setOpenWindow: any;
}) {
  const [open, setOpen] = React.useState(openWindow);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [length, setLength] = React.useState("");
  // const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };
  const { mutate, isLoading } = api.eventType.create.useMutation();
  const handleClose = () => {
    // setOpen(false);
    setOpenWindow(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div className=" ">
      <Dialog
        className="overflow-x-hidden"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className="  overflow-x-hidden text-black">
          {/* <DialogTitle id="scroll-dialog-title">
            Create a new Event Type
          </DialogTitle> */}
          <DialogContent
            className="w-[700px] py-6"
            dividers={scroll === "paper"}
          >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="  text-xl text-black">
                <h1 className="py-2 text-2xl font-bold">
                  Add a new event type
                </h1>
                <p className="pb-1" style={{ color: "#6b7280" }}>
                  Create a new event type for people to book times with.
                </p>
                <h1>Title</h1>
                <input
                  className="h-10 w-3/4  rounded border border-slate-600 px-2 py-4  text-sm tracking-normal"
                  type="text"
                  placeholder="Quick meet"
                  onChange={(e: Event) => {
                    if (e.target instanceof HTMLInputElement) {
                      setTitle(e.target.value.toString());
                    } else {
                      setTitle("");
                    }
                  }}
                />
                <h1>Description</h1>
                <input
                  className="srounded h-14  w-3/4 border border-slate-600 px-2   py-4 text-sm"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h1>Length (mins)</h1>
                <div className="flex">
                  <input
                    className="w-3/5 border border-slate-600 px-3"
                    type="number"
                    onChange={(e) => setLength(e.target.value.toString())}
                  />
                  <div className="rounded-r bg-[#374151]  px-1 py-1 font-thin text-white">
                    Minutes
                  </div>
                </div>
                <div className=" mr-20  flex  gap-3 pt-4 sm:justify-end">
                  <div
                    className="cursor-pointer rounded bg-black px-2 py-1 text-white"
                    onClick={handleClose}
                  >
                    Close
                  </div>
                  <div
                    className="cursor-pointer rounded bg-black px-2 py-1 text-white"
                    onClick={() => {
                      if (title == "") {
                        toast.error("Please enter title");
                        return;
                      }

                      if (length == "") {
                        toast.error("Please enter length");
                        return;
                      }
                      mutate({
                        title,
                        description,
                        userId: "clidxyggu0000uv4s20i35g04",
                        length,
                        hidden: false,
                      });
                      {
                        !isLoading && handleClose();
                      }
                    }}
                  >
                    Continue
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions></DialogActions> */}
        </div>
      </Dialog>
    </div>
  );
}
