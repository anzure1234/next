import {ToogleTheme} from "@/components/toggletheme";
import Link from "next/link";

export default function Header() {
    return <div>
        <div>
            <ul>
                <li>
                    <Link href="/login">Đăng nhập</Link>
                </li>
                <li>
                    <Link href="/register">Đăng ký</Link>
                </li>
            </ul>
        </div>
        <ToogleTheme/>
    </div>
}