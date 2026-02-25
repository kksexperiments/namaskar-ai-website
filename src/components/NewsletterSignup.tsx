import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leadCapture";
import { Loader2, Mail } from "lucide-react";
import useTypewriterPlaceholder from "@/hooks/useTypewriterPlaceholder";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const NewsletterSignup = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const magicInputPlaceholder = useTypewriterPlaceholder([
        "AI in Assamese",
        "Assamese AI learning",
        "learn AI Assam",
        "prompt packs Assamese",
    ]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
            toast({
                title: "Subscription failed",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const result = await submitLead({
                fallbackTable: "newsletter_subscribers",
                fallbackPayload: { email: normalizedEmail },
                treatFallbackDuplicateAsSuccess: true,
            });

            if (!result.ok) {
                throw new Error(result.error || "Subscription request failed.");
            }

            if (result.duplicate) {
                toast({
                    title: "Already subscribed!",
                    description: "You're already on our list. Stay tuned for updates!",
                });
                return;
            }

            trackEvent("newsletter_subscribed", { email_domain: normalizedEmail.split("@")[1] });
            toast({
                title: "Successfully subscribed!",
                description: "Welcome to the Namaskar AI community.",
            });
            setEmail("");
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
                        placeholder={magicInputPlaceholder || "Enter your email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="heritage-magic-input pl-10 h-12"
                        required
                        disabled={loading}
                    />
                </div>
                <Button
                    type="submit"
                    data-magnetic="true"
                    className="magnetic-cta heritage-primary-cta w-full h-12 font-semibold"
                    disabled={loading}
                >
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
