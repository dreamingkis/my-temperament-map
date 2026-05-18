import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "관리자 — 비스타" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

interface Row {
  id: string;
  created_at: string;
  test_type: string;
  nickname: string | null;
  age_range: string | null;
  gender: string | null;
  occupation: string | null;
  concern: string | null;
  scores: Record<string, number>;
  facet_scores: Record<string, Record<number, number>> | null;
}

function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setRows(null); return; }
    (async () => {
      const { data, error } = await supabase
        .from("intake_responses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) setError(error.message);
      else { setRows(data as Row[]); setError(null); }
    })();
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const message = error.message.includes("Invalid login credentials")
        ? "이메일 인증을 완료했는지 확인해 주세요. 가입 직후에는 인증 메일 확인 후 로그인할 수 있습니다."
        : error.message;
      toast.error(message);
    }
    setAuthBusy(false);
  };

  const handleSignup = async () => {
    if (!email || !password) { toast.error("이메일/비밀번호를 입력하세요"); return; }
    if (password.length < 6) { toast.error("비밀번호는 6자 이상으로 입력하세요"); return; }
    setAuthBusy(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (error) {
      const message = error.message.includes("only request this after")
        ? "인증 메일 요청이 너무 잦습니다. 잠시 후 다시 시도하거나, 이미 받은 인증 메일을 확인해 주세요."
        : error.message.includes("Password should be")
          ? "비밀번호가 너무 약합니다. 6자 이상이면서 쉽게 추측하기 어려운 비밀번호를 사용해 주세요."
          : error.message;
      toast.error(message);
    } else {
      toast.success("가입 신청 완료. 이메일 인증 후 로그인하세요.");
    }
    setAuthBusy(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const downloadCsv = () => {
    if (!rows) return;
    const header = ["created_at","test_type","nickname","age_range","gender","occupation","concern","O","C","E","A","N"];
    const lines = [header.join(",")];
    for (const r of rows) {
      const s = r.scores || {};
      const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g,'""')}"`;
      lines.push([
        r.created_at, r.test_type, r.nickname, r.age_range, r.gender,
        r.occupation, r.concern, s.O, s.C, s.E, s.A, s.N,
      ].map(esc).join(","));
    }
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `intake-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  if (loading) return <main className="min-h-screen p-8 text-center text-muted-foreground">로딩...</main>;

  if (!session) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-md px-4 py-20">
          <h1 className="text-2xl font-bold">관리자 로그인</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            비스타 운영자만 사용 가능합니다. 처음 가입했다면 이메일 인증을 완료한 뒤 로그인해 주세요.
          </p>
          <Card className="mt-6 p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
              <Button type="submit" className="w-full" disabled={authBusy}>로그인</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={handleSignup} disabled={authBusy}>
                처음 사용 — 가입하기
              </Button>
            </form>
          </Card>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            insuk@bestar.kr 계정은 생성되어 관리자 권한이 부여되었습니다. 메일함에서 인증 링크를 누른 후 같은 비밀번호로 로그인하세요.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">진단 응답 데이터</h1>
            <p className="text-sm text-muted-foreground">맞춤 해석을 받은 사용자의 응답 ({rows?.length ?? 0}건)</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadCsv} variant="outline" disabled={!rows?.length}>CSV 다운로드</Button>
            <Button onClick={handleLogout} variant="ghost">로그아웃</Button>
          </div>
        </div>

        {error && (
          <Card className="mt-6 border-destructive/40 bg-destructive/5 p-4 text-sm">
            데이터 조회 권한이 없습니다. 관리자 권한이 부여되어 있는지 확인하세요. ({error})
          </Card>
        )}

        {rows && rows.length === 0 && !error && (
          <Card className="mt-6 p-8 text-center text-sm text-muted-foreground">
            아직 제출된 응답이 없습니다.
          </Card>
        )}

        {rows && rows.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-2">일시</th>
                  <th className="p-2">유형</th>
                  <th className="p-2">닉네임</th>
                  <th className="p-2">연령</th>
                  <th className="p-2">성별</th>
                  <th className="p-2">직업</th>
                  <th className="p-2">고민</th>
                  <th className="p-2">O/C/E/A/N</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b align-top hover:bg-muted/30">
                    <td className="p-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString("ko-KR")}</td>
                    <td className="p-2">{r.test_type === "deep" ? "심층" : "기본"}</td>
                    <td className="p-2 font-medium">{r.nickname}</td>
                    <td className="p-2">{r.age_range}</td>
                    <td className="p-2">{r.gender}</td>
                    <td className="p-2">{r.occupation}</td>
                    <td className="p-2 max-w-[260px]">{r.concern}</td>
                    <td className="p-2 whitespace-nowrap tabular-nums">
                      {r.scores?.O}/{r.scores?.C}/{r.scores?.E}/{r.scores?.A}/{r.scores?.N}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
