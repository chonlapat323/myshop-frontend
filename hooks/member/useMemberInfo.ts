import { useEffect, useState } from "react";
import { getMemberInfo } from "@/services/member/member.service";
import { MemberProfileForm } from "@/types/member/MemberProfileForm";

export function useMemberInfo() {
  const [member, setMember] = useState<MemberProfileForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberInfo();
        setMember(data);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลสมาชิกได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { member, loading, error };
}
