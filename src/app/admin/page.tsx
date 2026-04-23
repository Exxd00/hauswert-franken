"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, Images, Palette, FileText, MapPin, Link2, Copy, Check, Eye, EyeOff, Download, Layers } from "lucide-react";

const ADMIN_PASSWORD = "Leavemealone2003+";

// Logo SVG content
const logoSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 9.5L12 4L21 9.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 20V14H15V20" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

// Full logo with text SVG
const fullLogoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
  <g fill="none" stroke="#1e293b" stroke-width="2">
    <path d="M10 25L25 15L40 25" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37 28V40C37 40.5 36.5 41 36 41H14C13.5 41 13 40.5 13 40V28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 41V32H30V41" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="50" y="32" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e293b">RD Bau</text>
  <text x="50" y="46" font-family="Arial, sans-serif" font-size="10" fill="#64748b" letter-spacing="2">FRANKEN</text>
</svg>`;

// Color palette from the site
const colorPalette = {
  light: [
    { name: "Background", value: "hsl(210 20% 98%)", hex: "#f8fafc" },
    { name: "Foreground", value: "hsl(222 47% 11%)", hex: "#0f172a" },
    { name: "Primary (Navy)", value: "hsl(222 47% 15%)", hex: "#1e293b" },
    { name: "Secondary", value: "hsl(215 20% 93%)", hex: "#e2e8f0" },
    { name: "Accent (Gold)", value: "hsl(45 93% 47%)", hex: "#eab308" },
    { name: "Muted", value: "hsl(215 15% 95%)", hex: "#f1f5f9" },
    { name: "Border", value: "hsl(215 20% 88%)", hex: "#cbd5e1" },
    { name: "Brand Navy", value: "hsl(222 47% 15%)", hex: "#1e293b" },
    { name: "Brand Navy Light", value: "hsl(222 35% 25%)", hex: "#334155" },
    { name: "Brand Slate", value: "hsl(215 25% 65%)", hex: "#94a3b8" },
    { name: "Brand Cream", value: "hsl(45 30% 97%)", hex: "#fefce8" },
    { name: "Brand Gold", value: "hsl(45 93% 47%)", hex: "#eab308" },
    { name: "Brand Gold Dark", value: "hsl(43 96% 40%)", hex: "#ca8a04" },
    { name: "Brand Copper", value: "hsl(25 75% 47%)", hex: "#c2410c" },
  ],
  dark: [
    { name: "Background", value: "hsl(222 47% 6%)", hex: "#0c0f17" },
    { name: "Foreground", value: "hsl(210 20% 95%)", hex: "#f1f5f9" },
    { name: "Primary (Gold)", value: "hsl(45 93% 55%)", hex: "#facc15" },
    { name: "Secondary", value: "hsl(222 30% 14%)", hex: "#1e293b" },
    { name: "Accent", value: "hsl(222 30% 18%)", hex: "#1e293b" },
    { name: "Muted", value: "hsl(222 30% 14%)", hex: "#1e293b" },
    { name: "Border", value: "hsl(222 30% 18%)", hex: "#1e293b" },
  ],
};

// Site pages/links
const sitePages = [
  { name: "Startseite", path: "/" },
  { name: "Leistungen", path: "/leistungen" },
  { name: "Kernsanierung", path: "/leistung/kernsanierung" },
  { name: "Badsanierung", path: "/leistung/badsanierung" },
  { name: "Modernisierung", path: "/leistung/modernisierung" },
  { name: "Projekte", path: "/projekte" },
  { name: "Projekt 1", path: "/projekt/1" },
  { name: "Projekt 2", path: "/projekt/2" },
  { name: "Projekt 3", path: "/projekt/3" },
  { name: "Galerie", path: "/galerie" },
  { name: "Über uns", path: "/ueber-uns" },
  { name: "Kontakt", path: "/kontakt" },
  { name: "Impressum", path: "/impressum" },
  { name: "Datenschutz", path: "/datenschutz" },
];

// City pages
const cityPages = [
  { name: "Nürnberg", path: "/nuernberg" },
  { name: "Fürth", path: "/fuerth" },
  { name: "Erlangen", path: "/erlangen" },
  { name: "Bamberg", path: "/bamberg" },
  { name: "Würzburg", path: "/wuerzburg" },
];

interface ProjectImage {
  path: string;
  name: string;
  folder: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"logo" | "images" | "colors" | "sitemap">("logo");
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);

  // Load project images
  useEffect(() => {
    if (isAuthenticated) {
      // Static list of project images
      const images: ProjectImage[] = [
        // Projekt 1 - Vorher
        { path: "/photos/projekt-1/PHOTO-2026-01-14-10-45-49.JPG", name: "PHOTO-2026-01-14-10-45-49.JPG", folder: "Projekt 1 - Vorher" },
        { path: "/photos/projekt-1/PHOTO-2026-01-14-10-46-09.JPG", name: "PHOTO-2026-01-14-10-46-09.JPG", folder: "Projekt 1 - Vorher" },
        { path: "/photos/projekt-1/PHOTO-2026-01-14-10-46-21.JPG", name: "PHOTO-2026-01-14-10-46-21.JPG", folder: "Projekt 1 - Vorher" },
        { path: "/photos/projekt-1/PHOTO-2026-01-19-17-31-33.JPG", name: "PHOTO-2026-01-19-17-31-33.JPG", folder: "Projekt 1 - Vorher" },
        { path: "/photos/projekt-1/PHOTO-2026-01-21-17-36-55.JPG", name: "PHOTO-2026-01-21-17-36-55.JPG", folder: "Projekt 1 - Vorher" },
        { path: "/photos/projekt-1/PHOTO-2026-01-22-17-43-33.JPG", name: "PHOTO-2026-01-22-17-43-33.JPG", folder: "Projekt 1 - Vorher" },
        // Projekt 1 - Nachher
        { path: "/photos/projekt-1/nachher/PHOTO-2026-02-03-18-32-50.JPG", name: "PHOTO-2026-02-03-18-32-50.JPG", folder: "Projekt 1 - Nachher" },
        { path: "/photos/projekt-1/nachher/PHOTO-2026-02-04-18-03-46.JPG", name: "PHOTO-2026-02-04-18-03-46.JPG", folder: "Projekt 1 - Nachher" },
        { path: "/photos/projekt-1/nachher/PHOTO-2026-02-14-14-38-36.JPG", name: "PHOTO-2026-02-14-14-38-36.JPG", folder: "Projekt 1 - Nachher" },
        { path: "/photos/projekt-1/nachher/PHOTO-2026-02-25-18-07-17.JPG", name: "PHOTO-2026-02-25-18-07-17.JPG", folder: "Projekt 1 - Nachher" },
        { path: "/photos/projekt-1/nachher/PHOTO-2026-02-27-16-45-20.JPG", name: "PHOTO-2026-02-27-16-45-20.JPG", folder: "Projekt 1 - Nachher" },
        // Projekt 2 - Vorher
        { path: "/photos/projekt-2/PHOTO-2025-12-08-13-24-46.JPG", name: "PHOTO-2025-12-08-13-24-46.JPG", folder: "Projekt 2 - Vorher" },
        { path: "/photos/projekt-2/PHOTO-2025-12-09-12-16-34.JPG", name: "PHOTO-2025-12-09-12-16-34.JPG", folder: "Projekt 2 - Vorher" },
        { path: "/photos/projekt-2/PHOTO-2025-12-09-12-16-37.JPG", name: "PHOTO-2025-12-09-12-16-37.JPG", folder: "Projekt 2 - Vorher" },
        { path: "/photos/projekt-2/PHOTO-2025-12-11-17-09-41.JPG", name: "PHOTO-2025-12-11-17-09-41.JPG", folder: "Projekt 2 - Vorher" },
        { path: "/photos/projekt-2/PHOTO-2025-12-22-16-36-28.JPG", name: "PHOTO-2025-12-22-16-36-28.JPG", folder: "Projekt 2 - Vorher" },
        // Projekt 2 - Nachher
        { path: "/photos/projekt-2/nachher/PHOTO-2026-02-03-18-33-10.JPG", name: "PHOTO-2026-02-03-18-33-10.JPG", folder: "Projekt 2 - Nachher" },
        { path: "/photos/projekt-2/nachher/PHOTO-2026-02-04-18-05-09.JPG", name: "PHOTO-2026-02-04-18-05-09.JPG", folder: "Projekt 2 - Nachher" },
        { path: "/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23.JPG", name: "PHOTO-2026-02-06-18-18-23.JPG", folder: "Projekt 2 - Nachher" },
        { path: "/photos/projekt-2/nachher/PHOTO-2026-02-27-16-45-41.JPG", name: "PHOTO-2026-02-27-16-45-41.JPG", folder: "Projekt 2 - Nachher" },
        // Projekt 3 - Vorher
        { path: "/photos/projekt-3/IMG_1364.JPG", name: "IMG_1364.JPG", folder: "Projekt 3 - Vorher" },
        { path: "/photos/projekt-3/IMG_1366.JPG", name: "IMG_1366.JPG", folder: "Projekt 3 - Vorher" },
        { path: "/photos/projekt-3/IMG_1376.JPG", name: "IMG_1376.JPG", folder: "Projekt 3 - Vorher" },
        { path: "/photos/projekt-3/IMG_1377.JPG", name: "IMG_1377.JPG", folder: "Projekt 3 - Vorher" },
        { path: "/photos/projekt-3/IMG_1381.JPG", name: "IMG_1381.JPG", folder: "Projekt 3 - Vorher" },
        { path: "/photos/projekt-3/IMG_1390.JPG", name: "IMG_1390.JPG", folder: "Projekt 3 - Vorher" },
        // Projekt 3 - Nachher
        { path: "/photos/projekt-3/nachher/IMG_1378.JPG", name: "IMG_1378.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1435.JPG", name: "IMG_1435.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1436.JPG", name: "IMG_1436.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1497.JPG", name: "IMG_1497.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1502.JPG", name: "IMG_1502.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1523.JPG", name: "IMG_1523.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1547.JPG", name: "IMG_1547.JPG", folder: "Projekt 3 - Nachher" },
        { path: "/photos/projekt-3/nachher/IMG_1600.JPG", name: "IMG_1600.JPG", folder: "Projekt 3 - Nachher" },
      ];
      setProjectImages(images);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Falsches Passwort. Bitte versuchen Sie es erneut.");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const downloadSVG = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = (svgContent: string, filename: string, width: number = 512, height: number = 512) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(pngUrl);
        }
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // Group images by folder
  const groupedImages = projectImages.reduce((acc, img) => {
    if (!acc[img.folder]) {
      acc[img.folder] = [];
    }
    acc[img.folder].push(img);
    return acc;
  }, {} as Record<string, ProjectImage[]>);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Bereich</h1>
            <p className="text-slate-400 text-center mb-6">Geben Sie Ihr Passwort ein, um fortzufahren</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-500/25"
              >
                Anmelden
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">RD Frankenbau Admin</h1>
                <p className="text-xs text-slate-400">Design System & Assets</p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 bg-white/5 rounded-xl p-1 w-fit flex-wrap">
          <button
            onClick={() => setActiveTab("logo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "logo"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            Logo & Brand
          </button>
          <button
            onClick={() => setActiveTab("colors")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "colors"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            Farbpalette
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "images"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Images className="w-4 h-4" />
            Bilder
          </button>
          <button
            onClick={() => setActiveTab("sitemap")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "sitemap"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Sitemap
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo Tab */}
        {activeTab === "logo" && (
          <div className="space-y-8">
            {/* Logo Icon */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                Logo Icon (Favicon)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Light Background */}
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
                  <div
                    className="w-24 h-24 text-slate-800"
                    dangerouslySetInnerHTML={{ __html: logoSVG.replace('currentColor', '#1e293b') }}
                  />
                  <p className="text-sm text-slate-600">Auf hellem Hintergrund</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSVG(logoSVG.replace('currentColor', '#1e293b'), 'rd-frankenbau-icon-dark.svg')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SVG
                    </button>
                  </div>
                </div>

                {/* Dark Background */}
                <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center gap-4 border border-white/10">
                  <div
                    className="w-24 h-24 text-white"
                    dangerouslySetInnerHTML={{ __html: logoSVG.replace('currentColor', '#ffffff') }}
                  />
                  <p className="text-sm text-slate-400">Auf dunklem Hintergrund</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSVG(logoSVG.replace('currentColor', '#ffffff'), 'rd-frankenbau-icon-light.svg')}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SVG
                    </button>
                  </div>
                </div>

                {/* Gold Accent */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 flex flex-col items-center gap-4 border border-amber-500/20">
                  <div
                    className="w-24 h-24"
                    dangerouslySetInnerHTML={{ __html: logoSVG.replace('currentColor', '#eab308') }}
                  />
                  <p className="text-sm text-slate-400">Mit Gold Akzent</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSVG(logoSVG.replace('currentColor', '#eab308'), 'rd-frankenbau-icon-gold.svg')}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SVG
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Logo */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                Vollständiges Logo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Light Background */}
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
                  <div
                    className="w-full max-w-xs h-20"
                    dangerouslySetInnerHTML={{ __html: fullLogoSVG }}
                  />
                  <p className="text-sm text-slate-600">Auf hellem Hintergrund</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSVG(fullLogoSVG, 'rd-frankenbau-logo.svg')}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SVG
                    </button>
                  </div>
                </div>

                {/* Dark Background */}
                <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center gap-4 border border-white/10">
                  <div
                    className="w-full max-w-xs h-20"
                    dangerouslySetInnerHTML={{ __html: fullLogoSVG.replace(/#1e293b/g, '#ffffff').replace(/#64748b/g, '#94a3b8') }}
                  />
                  <p className="text-sm text-slate-400">Auf dunklem Hintergrund</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSVG(fullLogoSVG.replace(/#1e293b/g, '#ffffff').replace(/#64748b/g, '#94a3b8'), 'rd-frankenbau-logo-light.svg')}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      SVG
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Original Favicon */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Original Favicon herunterladen</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <div
                        className="w-8 h-8"
                        dangerouslySetInnerHTML={{ __html: logoSVG.replace('currentColor', '#1e293b') }}
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">favicon.svg</p>
                      <p className="text-sm text-slate-400">SVG Vector Format</p>
                    </div>
                  </div>
                  <a
                    href="/favicon.svg"
                    download="favicon.svg"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Herunterladen
                  </a>
                </div>
              </div>
            </div>

            {/* Brand Guidelines */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Markenrichtlinien</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Firmenname</p>
                    <p className="text-xl text-white font-bold">RD Frankenbau</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Slogan</p>
                    <p className="text-lg text-white">Wir steigern den Wert Ihrer Immobilie.</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Primärfarbe</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1e293b]" />
                    <span className="text-white">Navy #1e293b</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Akzentfarbe</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eab308]" />
                    <span className="text-white">Gold #eab308</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === "colors" && (
          <div className="space-y-8">
            {/* Light Mode Colors */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full" />
                Light Mode Farben
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {colorPalette.light.map((color, index) => (
                  <div
                    key={`light-${index}`}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/50 transition-all group"
                  >
                    <div
                      className="w-full aspect-square rounded-lg mb-3 shadow-lg ring-1 ring-white/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium text-white mb-1">{color.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">{color.hex}</p>
                      <button
                        onClick={() => copyToClipboard(color.hex, `light-${index}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedColor === `light-${index}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Mode Colors */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-800 rounded-full border border-white/20" />
                Dark Mode Farben
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {colorPalette.dark.map((color, index) => (
                  <div
                    key={`dark-${index}`}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/50 transition-all group"
                  >
                    <div
                      className="w-full aspect-square rounded-lg mb-3 shadow-lg ring-1 ring-white/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium text-white mb-1">{color.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">{color.hex}</p>
                      <button
                        onClick={() => copyToClipboard(color.hex, `dark-${index}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedColor === `dark-${index}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Variables */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">CSS Variablen</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono whitespace-pre">
{`:root {
  --background: 210 20% 98%;
  --foreground: 222 47% 11%;
  --primary: 222 47% 15%;
  --secondary: 215 20% 93%;
  --accent: 45 93% 47%;
  --muted: 215 15% 95%;
  --border: 215 20% 88%;
  --brand-navy: 222 47% 15%;
  --brand-gold: 45 93% 47%;
  --brand-copper: 25 75% 47%;
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <div className="space-y-8">
            {Object.entries(groupedImages).map(([folder, images]) => (
              <div key={folder}>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Images className="w-5 h-5 text-amber-500" />
                  {folder}
                  <span className="text-sm font-normal text-slate-400">({images.length} Bilder)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <a
                      key={`${folder}-${index}`}
                      href={img.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all group"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={img.path}
                          alt={img.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-slate-400 truncate">{img.name}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sitemap Tab */}
        {activeTab === "sitemap" && (
          <div className="space-y-8">
            {/* Main Pages */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-amber-500" />
                Hauptseiten
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sitePages.map((page, index) => (
                  <a
                    key={index}
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <span className="text-white">{page.name}</span>
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{page.path}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* City Pages */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                Städteseiten
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cityPages.map((page, index) => (
                  <a
                    key={index}
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <span className="text-white">{page.name}</span>
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{page.path}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Typografie</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Überschriften</p>
                  <p className="text-2xl text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Playfair Display - Elegant & Premium
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Fließtext</p>
                  <p className="text-lg text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    Inter - Modern & Readable
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Kontaktdaten</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Telefon:</span>
                  <span className="text-white">+49 174 2629258</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">E-Mail:</span>
                  <span className="text-white">info@rd-frankenbau.de</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Adresse:</span>
                  <span className="text-white">Hans Bunte Straße 26, 90431 Nürnberg</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Website:</span>
                  <a href="https://rd-frankenbau.de" className="text-amber-500 hover:text-amber-400">
                    rd-frankenbau.de
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
