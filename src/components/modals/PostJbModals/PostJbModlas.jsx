// src/components/modals/PostJobModal/PostJobModal.jsx
import { useState } from "react";
// import { useAuth } from "@/lib/context/AuthContext";
// import { postNewJobs } from "@/lib/api/apiService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext";
import { postNewJobs } from "@/lib/api/apiService";

const PostJobModal = ({ trigger, onSuccess }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    jobDescription: "",
    companyName: user?.companyName || "",
    skills: "",
    salaryRange: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postNewJobs(formData);

      if (response.success) {
        toast.success(response.message);
        setIsOpen(false);
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
          title: "",
          jobDescription: "",
          companyName: user?.companyName || "",
          skills: "",
          salaryRange: "",
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new job posting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Senior Java Developer"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Your company name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.jobDescription}
                onChange={handleChange}
                required
                className="mt-1.5 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                name="skills"
                placeholder="e.g., Java, SQL, Spring, React (comma separated)"
                value={formData.skills}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder="e.g., 100-150k"
                value={formData.salaryRange}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobModal;
