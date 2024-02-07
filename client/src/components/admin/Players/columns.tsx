import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


type Player = {
  firstName: string,
  lastName: string,
  email: string,
  teamName: string,
  gender: string,
  phoneNo: string,
  dateOfBirth: Date,

}



export const columns: ColumnDef<Player>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",

    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    header: "Phone No",
    accessorKey: "phoneNo",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date of Birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "birthDate",
    cell: ({ row }) => {
      const date_of_birth = row.getValue("birthDate");
      const formatted = new Date(date_of_birth as string).toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;
      const navigate = useNavigate()
      return (

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigate('/admin/player/65b931a327383f419c6cdff3')
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.email.toString());
              }}
            >
              Copy person name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];