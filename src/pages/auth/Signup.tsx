import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export function Signup() {
  const { signup, error, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await signup({ name, email, password });
    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8" data-oid="94v980o">
      <Card data-oid="r5h3qiu">
        <CardHeader data-oid="q_jmudg">
          <CardTitle className="text-xl" data-oid="ozepcro">
            Créer un compte
          </CardTitle>
          <CardDescription data-oid=".b0pegk">
            Rejoignez PyramidPlay
          </CardDescription>
        </CardHeader>
        <CardContent data-oid="q0fev2i">
          <form onSubmit={onSubmit} className="space-y-4" data-oid=":e0iri6">
            <div data-oid="ojshpip">
              <label className="block text-sm mb-1" data-oid="213re84">
                Nom
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                data-oid="h9nk-ya"
              />
            </div>
            <div data-oid="bdrek6y">
              <label className="block text-sm mb-1" data-oid="4vmg3cc">
                E‑mail
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                data-oid="ok3:qrm"
              />
            </div>
            <div data-oid="a3q.w3a">
              <label className="block text-sm mb-1" data-oid="ouitq0g">
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-oid="c5802j-"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm" data-oid="yp04_e5">
                {error}
              </div>
            )}
            <Button type="submit" disabled={submitting} data-oid="4-10m:d">
              {submitting ? "Création…" : "S’inscrire"}
            </Button>
          </form>
          <div className="mt-4 text-sm" data-oid="2q-6kyp">
            Déjà inscrit ?{" "}
            <Link to="/auth/login" className="underline" data-oid="wtpr9ky">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
