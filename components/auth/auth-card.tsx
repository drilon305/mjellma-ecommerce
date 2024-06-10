import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Social from "./social"
import { BackButton } from "./back-button"

type cardWrapperProps = {
    children: React.ReactNode,
    cardTitle: string,
    backButtonHref: string,
    backButtonLabel: string,
    showSocial?: boolean
}



export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocial,
}: CardWrapperProps) => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}

        <CardFooter>
            <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
    </Card>
    )
}
