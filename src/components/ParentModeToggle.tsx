import { useState } from "react";
import { Button } from "./ui/button";
import { Lock, Unlock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

interface ParentModeToggleProps {
  isParentMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export function ParentModeToggle({
  isParentMode,
  onToggle,
}: ParentModeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState("");
  const PARENT_PIN = "1234"; // In production, this should be stored securely

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PARENT_PIN) {
      onToggle(true);
      setIsOpen(false);
      setPin("");
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <>
      <Button
        variant={isParentMode ? "destructive" : "outline"}
        size="sm"
        onClick={() => {
          if (isParentMode) {
            onToggle(false);
          } else {
            setIsOpen(true);
          }
        }}
      >
        {isParentMode ? (
          <>
            <Unlock className="h-4 w-4 mr-2" />
            Exit Parent Mode
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Parent Mode
          </>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Parent PIN</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
