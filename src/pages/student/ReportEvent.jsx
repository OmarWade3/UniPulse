import { AlertTriangle, ArrowLeft, CheckCircle, Flag } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { eventViewModel, getEvent } from "../../components/shared/dataHelpers";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { saveEventReport } from "../../data/reportStorage";

const reportReasons = [
  "Misleading information",
  "Spam or scam",
  "Harassment or inappropriate content",
  "Violence or unsafe activity",
  "Other",
];

export default function ReportEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventViewModel(getEvent(eventId));
  const [reason, setReason] = useState(reportReasons[0]);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isReady = useMemo(() => reason && details.trim().length >= 10, [reason, details]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isReady) return;

    saveEventReport({
      eventId,
      eventTitle: event.title,
      reason,
      details,
      reportedBy: "Student",
    });
    setSubmitted(true);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">This event could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 pb-24">
        <button onClick={() => navigate(-1)} className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to event
        </button>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-full bg-destructive/10 p-3 text-destructive">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Report this event</h1>
              <p className="text-sm text-muted-foreground">
                Share why this event should be reviewed by the admin team.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle className="h-5 w-5" />
                Report submitted successfully
              </div>
              <p className="mt-2 text-sm">
                Your report has been sent to the moderation queue for review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-medium">Event</p>
                <p className="mt-1 font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for report</label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportReasons.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional details</label>
                <Textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="Tell us what looks wrong or unsafe about this event..."
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground">Please include enough detail for the admin to review the issue.</p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Reports are reviewed by admins and may lead to moderation action.
              </div>

              <Button type="submit" className="w-full" disabled={!isReady}>
                Submit report
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
