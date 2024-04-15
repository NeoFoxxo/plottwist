import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

export default function UpgradeCard() {
    return (
        <Card className="mb-4 border-none bg-black/50">
            <CardHeader className="text-2xl font-bold">
                Upgrade to Pro plan
            </CardHeader>
            <CardContent>
                Unlock all features and get unlimited access to our support
                team.
            </CardContent>
            <CardFooter>
                <Button
                    style={{ border: "solid rgba(255,255,255,0.650) 1px" }}
                    variant={"ghost"}
                    className="w-full"
                >
                    Upgrade
                </Button>
            </CardFooter>
        </Card>
    );
}
