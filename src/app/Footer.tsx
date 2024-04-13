import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-red-900 bg-opacity-15">
      <div className="flex gap-2 mt-8">
        <a
          className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
          href="#features"
        >
          <div className="hidden md:block">
            <Sheet>
              <SheetTrigger className="btn-shine bg-black">
                Contact us
              </SheetTrigger>
              <SheetContent className="bg-[#130303] border-black">
                <SheetHeader>
                  <SheetTitle>Contact details:</SheetTitle>
                  <SheetDescription>Email: info@example.com</SheetDescription>
                  <SheetDescription>Contact: 123-456-7890</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="sm:hidden">
            <Drawer>
              <DrawerTrigger className="">Contact</DrawerTrigger>
              <DrawerContent className="bg-[#130303] border-black">
                <DrawerHeader>
                  <DrawerTitle>CONTACT DETAILS</DrawerTitle>
                  <DrawerDescription>Email:</DrawerDescription>
                  <DrawerDescription>Name:</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>Close</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="m-auto"></div>
        </a>
      </div>
    </div>
  );
};
export default Footer;
