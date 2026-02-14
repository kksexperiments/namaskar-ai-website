import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { Loader2, Mail } from "lucide-react";

const NewsletterSignup = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email }]);

            if (error) {
                if (error.code === "23505") { // Unique violation
                    toast({
                        title: "Already subscribed!",
                        description: "You're already on our list. Stay tuned for updates!",
                    });
                } else {
                    throw error;
                }
            } else {
                trackEvent("newsletter_subscribed", { email_domain: email.split("@")[1] });
                toast({
                    title: "Successfully subscribed!",
                    description: "Welcome to the Namaskar AI community.",
                });
                setEmail("");
            }
        } catch (error: unknown) {
            console.error("Newsletter error:", error);
            toast({
                title: "Subscription failed",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                    />
                </div>
                <Button type="submit" className="w-full h-12 font-semibold" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        "Join the Newsletter"
                    )}
                </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-4">
                By subscribing, you agree to our privacy policy and terms of service.
            </p>
        </div>
    );
};

export default NewsletterSignup;
