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

export function Login() {
  const { login, error, user } = useAuth();
  const navigate = useNavigate();
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
    await login({ email, password });
    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8" data-oid="tf-8-1i">
      <Card data-oid="b1_qgl-">
        <CardHeader data-oid="q89afbi">
          <CardTitle className="text-xl" data-oid="l-qcym:">
            Connexion
          </CardTitle>
          <CardDescription data-oid="4l7:m8s">
            Accédez à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent data-oid="7birm5l">
          <form onSubmit={onSubmit} className="space-y-4" data-oid="koz4g.p">
            <div data-oid="4o.jd8w">
              <label className="block text-sm mb-1" data-oid="iruvyav">
                E‑mail
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                data-oid="7i442_w"
              />
            </div>
            <div data-oid="0k-7aym">
              <label className="block text-sm mb-1" data-oid="c5yp1bi">
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-oid="7bwy2cn"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm" data-oid="irbvl6.">
                {error}
              </div>
            )}
            <Button type="submit" disabled={submitting} data-oid="lc.u77j">
              {submitting ? "Connexion…" : "Se connecter"}
            </Button>
          </form>
          <div className="mt-4 text-sm" data-oid="6f9wg:0">
            Pas de compte ?{" "}
            <Link to="/auth/signup" className="underline" data-oid="dafhhzp">
              S’inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
