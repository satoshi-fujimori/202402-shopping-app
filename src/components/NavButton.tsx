import { Bars3Icon } from "@heroicons/react/16/solid";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NavContent from "./NavContent";

export default function NavButton() {
  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <button className="ml-2">
            <Bars3Icon className="w-6" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="top-0 mt-10 h-fit rounded-md w-2/3 sm:w-1/3">
          <DrawerHeader className="">
            <NavContent />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
