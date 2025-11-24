import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            AI Tools Finder
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover and explore the best AI tools for your needs
          </p>
        </section>

        {/* Components Showcase */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Component Showcase</h2>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button variants and sizes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </CardContent>
            <CardContent className="flex flex-wrap gap-4 pt-0">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
              <CardDescription>Input fields with labels and error messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
                description="We'll never share your email with anyone else."
              />
              <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <FormField
                label="Search"
                type="search"
                placeholder="Search tools..."
              />
              <FormField
                label="Email with Error"
                type="email"
                placeholder="invalid@email"
                error="Please enter a valid email address"
              />
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>This is a card component example</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards are used to display content in a contained format. They can include headers,
                content, and footers.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>

          {/* Loading Spinner */}
          <Card>
            <CardHeader>
              <CardTitle>Loading Spinner</CardTitle>
              <CardDescription>Different sizes of loading indicators</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="sm" />
                <span className="text-xs text-muted-foreground">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="md" />
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="lg" />
                <span className="text-xs text-muted-foreground">Large</span>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert message for informational content.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                This is an error alert message for important error information.
              </AlertDescription>
            </Alert>
          </div>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog / Modal</CardTitle>
              <CardDescription>Click the button to open a dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Example Dialog</DialogTitle>
                    <DialogDescription>
                      This is an example of a dialog component. It includes proper focus
                      management and accessibility features.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Dialog content goes here. You can add any content you need.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
