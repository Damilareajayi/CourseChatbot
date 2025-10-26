import { BookOpen, GraduationCap, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CourseSidebar() {
  return (
    <aside className="w-80 h-full bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg border border-sidebar-border bg-gradient-to-br from-primary to-primary/80">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                <BookOpen className="w-20 h-20 text-white mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Trends and Issues in
                  </h3>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    Instructional Design
                  </h3>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    and Technology
                  </h3>
                </div>
                <div className="space-y-1">
                  <p className="text-white/90 text-sm font-medium">Fifth Edition</p>
                  <p className="text-white/80 text-xs">
                    Reiser, Carr-Chellman, Dempsey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-sidebar-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Course Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                Course Code
              </p>
              <p className="text-foreground font-semibold">EME 5608</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                Course Title
              </p>
              <p className="text-foreground font-medium leading-snug">
                Trends and Issues in Instructional Design and Technology
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                Instructor
              </p>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-foreground font-medium">Dr. Songhee Han</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-secondary" />
              About This Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>
              This AI assistant helps you explore the textbook content by answering questions about instructional design and technology.
            </p>
            <p className="text-xs">
              All responses include page references so you can read more in your textbook.
            </p>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border bg-gradient-to-br from-accent/50 to-accent/30">
          <CardContent className="pt-6 pb-6 text-xs text-center text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Textbook Sections</p>
            <p className="leading-relaxed">
              Definition & History • Design Models • Learning Theories • Evaluation • Performance Improvement • Professional Settings • Tools & Technologies • Current Issues
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
