import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AGE_RANGES, GENDERS, intakeSchema, type IntakeInput } from "@/lib/intake";

interface Props {
  onSubmit: (data: IntakeInput) => void;
  onSkip?: () => void;
  submitting?: boolean;
}

export function IntakeForm({ onSubmit, onSkip, submitting }: Props) {
  const [form, setForm] = useState<IntakeInput>({
    nickname: "",
    age_range: "30대",
    gender: "여성",
    occupation: "",
    concern: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = intakeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight">맞춤 해석을 위한 정보</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        아래 정보를 바탕으로 당신의 점수를 ‘일과 삶의 맥락’에서 해석해 드립니다.
        입력하신 내용은 비스타 팀이 콘텐츠 개선과 후속 가이드 제공을 위해 안전하게 보관합니다.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <Label htmlFor="nickname">닉네임 *</Label>
          <Input
            id="nickname"
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            placeholder="결과 화면에 사용할 이름"
            maxLength={40}
          />
          {errors.nickname && <p className="mt-1 text-xs text-destructive">{errors.nickname}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="age_range">연령대 *</Label>
            <select
              id="age_range"
              value={form.age_range}
              onChange={(e) => setForm({ ...form, age_range: e.target.value as IntakeInput["age_range"] })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="gender">성별 *</Label>
            <select
              id="gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value as IntakeInput["gender"] })}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="occupation">직업 또는 역할 *</Label>
          <Input
            id="occupation"
            value={form.occupation}
            onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            placeholder="예: 브랜드 디자이너, 1인 사업가, 마케터, 학생"
            maxLength={80}
          />
          {errors.occupation && <p className="mt-1 text-xs text-destructive">{errors.occupation}</p>}
        </div>

        <div>
          <Label htmlFor="concern">요즘 가장 큰 고민 한 줄 *</Label>
          <Textarea
            id="concern"
            value={form.concern}
            onChange={(e) => setForm({ ...form, concern: e.target.value })}
            placeholder="예: 내 강점이 뭔지 잘 모르겠다 / 방향은 있는데 실행이 안 된다"
            maxLength={300}
            rows={3}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            {errors.concern ? (
              <span className="text-destructive">{errors.concern}</span>
            ) : <span>점수를 당신의 고민 맥락에서 해석합니다.</span>}
            <span>{form.concern.length}/300</span>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          {onSkip && (
            <Button type="button" variant="ghost" onClick={onSkip} disabled={submitting}>
              건너뛰고 기본 결과만 보기
            </Button>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? "저장 중..." : "맞춤 해석 받기"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
