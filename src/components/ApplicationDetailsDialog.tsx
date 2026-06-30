'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;
}

export default function ApplicationDetailsDialog({
  open,
  onOpenChange,
  application,
}: Props) {

  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">

        <DialogHeader>
          <DialogTitle>
            Application Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">Opportunity</h3>
            <p>{application.opportunityName}</p>
          </div>

          <div>
            <h3 className="font-semibold">Date Applied</h3>
            <p>{application.dateApplied}</p>
          </div>

          <div>
            <h3 className="font-semibold">Status</h3>

            <Badge>
              {application.status}
            </Badge>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}