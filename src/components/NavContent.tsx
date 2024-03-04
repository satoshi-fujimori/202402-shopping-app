import { HomeIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function NavContent() {
  return (
    <ul className="flex flex-col gap-4">
      <li className="flex gap-2">
        <HomeIcon className="w-6" />
        <Link href="/">Home</Link>
      </li>
      <li className="flex gap-2">
        <ChartBarIcon className="w-6" />
        <Link href="/chart">Chart</Link>
      </li>
      <li>
        <AlertDialog>
          <AlertDialogTrigger className="flex gap-2">
            <ClockIcon className="w-6" />
            <p>History</p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>Coming soon</AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-accent">OK</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </li>
    </ul>
  );
}
