import Image from 'next/image'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-12">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          仮想通貨の管理、もっとシンプルに。
        </h1>
        <p className="text-lg sm:text-xl">
          無料で使えるポートフォリオ & ウォッチリスト管理ツール
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md">
          Googleで始める
        </button>
      </section>

      <section className="mt-20 max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
        <Feature icon="📊" title="リアルタイム評価額" />
        <Feature icon="📈" title="資産の内訳グラフ" />
        <Feature icon="🔔" title="お気に入りアラート（予定）" />
        <Feature icon="☁️" title="Googleログインで自動保存" />
      </section>

      <section className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">画面イメージ</h2>
        <div className="border rounded-xl overflow-hidden shadow-md">
          <Image
            src="/hero.png"
            alt="ヒーロー画像"
            width={800} // 適切な幅
            height={400} // 適切な高さ
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="mt-24 text-center space-y-6">
        <h2 className="text-2xl font-bold">
          今すぐ仮想通貨の管理をスマートに！
        </h2>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md">
          Googleで始める（無料）
        </button>
        <p className="text-sm text-gray-500">
          ※ログインにはGoogleアカウントが必要です
        </p>
      </section>
    </main>
  )
}

function Feature({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-sm">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  )
}
