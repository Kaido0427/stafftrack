import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({ className, ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Connexion soumise")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Connexion.</CardTitle>
          <CardDescription>
            Veuillez vous connecter avec vos identifiants officiels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="identifiant">Identifiant</FieldLabel>
                <Input
                  id="identifiant"
                  type="text"
                  placeholder="Votre identifiant"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("Veuillez contacter l'administration pour réinitialiser votre mot de passe.")
                    }}
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" className="w-full bg-green-700">
                  Se connecter
                </Button>
                <FieldDescription className="text-center mt-2">
                  Pour toute assistance, contactez l’administration.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-sm text-gray-500">
        En vous connectant, vous acceptez de respecter les règles et la charte officielle de la République du Bénin.
      </FieldDescription>
    </div>
  )
}