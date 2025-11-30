import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Profile() {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center" data-oid="tqy1yz2">
        <div className="text-sm" data-oid="qwuz6cj">
          Vous n’êtes pas connecté.
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-8" data-oid="gwnzj1t">
      <div className="rounded-xl border p-6" data-oid="32gxtqy">
        <div className="flex items-center gap-4" data-oid="lsvgz5h">
          <div
            className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white"
            data-oid="wtf.q72"
          >
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div data-oid="ym2b_.1">
            <div className="font-semibold" data-oid="f_cr8.z">
              {user.name}
            </div>
            <div className="text-sm text-gray-400" data-oid="x2klbow">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-6" data-oid="2lsfa4z">
          <Button variant="secondary" onClick={logout} data-oid="0xif-rg">
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
}
