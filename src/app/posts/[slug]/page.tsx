import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ShareBar from "@/components/ShareBar";
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/queries";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guadagnosmartpro.com";
