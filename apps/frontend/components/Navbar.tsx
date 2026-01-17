import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-2  bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-secondary px-3 py-1.5 rounded-md transition-colors">
          <span className="font-semibold text-sm text-secondary hover:text-primary">
            My Workspace
          </span>
          <ChevronDown className="h-4 w-4 text-secondary hover:text-primary" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant="secondary"
          className="rounded-full px-3 py-1 font-medium"
        >
          100 Credits
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-9 w-9"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
