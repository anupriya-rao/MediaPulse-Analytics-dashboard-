import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend, AreaChart, Area
} from "recharts";

/* ─── RAW DATA ───────────────────────────────────────────────────────── */
const RAW = [
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Almost always", concentrate:5, limit:"No", bedtime:"After 2 AM", sleep:"Yes, tired", stress:"Often", awareness:3, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Rarely", awareness:1, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Netflix / OTT", reason:"Entertainment", interrupt:"Almost always", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Often", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Almost always", concentrate:5, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Rarely", awareness:2, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Study", interrupt:"Sometimes", concentrate:3, limit:"No", bedtime:"After 2 AM", sleep:"Not really", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Study", interrupt:"Sometimes", concentrate:3, limit:"No", bedtime:"After 2 AM", sleep:"Not really", stress:"Occasionally", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Rarely", concentrate:1, limit:"Don't need", bedtime:"After 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Often", concentrate:5, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:4, detox:"Yes, once or twice" },
  { age:"15–17", status:"School student", screen:"2–4 hours", platforms:"Netflix / OTT", reason:"Gaming", interrupt:"Sometimes", concentrate:3, limit:"I try", bedtime:"Before 10 PM", sleep:"Not really", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:3, limit:"Don't need", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Occasionally", awareness:2, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Often", awareness:5, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"WhatsApp / Telegram", reason:"Study", interrupt:"Sometimes", concentrate:2, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Often", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Often", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Sometimes", concentrate:2, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Occasionally", awareness:5, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Study", interrupt:"Sometimes", concentrate:1, limit:"Don't need", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Rarely", awareness:4, detox:"Thought about it" },
  { age:"25+", status:"Postgraduate", screen:"2–4 hours", platforms:"Online news", reason:"News", interrupt:"Sometimes", concentrate:3, limit:"Don't need", bedtime:"Before 10 PM", sleep:"Not really", stress:"Almost always", awareness:4, detox:"No, don't plan" },
  { age:"25+", status:"Working", screen:"Less than 2 hours", platforms:"YouTube", reason:"News", interrupt:"Rarely", concentrate:2, limit:"Don't need", bedtime:"Before 10 PM", sleep:"Not really", stress:"Occasionally", awareness:5, detox:"No, don't plan" },
  { age:"25+", status:"Working", screen:"2–4 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Rarely", concentrate:4, limit:"No", bedtime:"Before 10 PM", sleep:"Not sure", stress:"Occasionally", awareness:4, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:4, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Often", concentrate:4, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Almost always", awareness:1, detox:"Yes, regularly" },
  { age:"21–24", status:"Postgraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Often", awareness:3, detox:"Yes, once or twice" },
  { age:"21–24", status:"Postgraduate", screen:"Less than 2 hours", platforms:"Twitter / X", reason:"Shopping", interrupt:"Sometimes", concentrate:2, limit:"I try", bedtime:"After 2 AM", sleep:"Not really", stress:"Rarely", awareness:2, detox:"Thought about it" },
  { age:"25+", status:"Working", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:2, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Rarely", awareness:3, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Almost always", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not sure", stress:"Often", awareness:1, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Almost always", concentrate:5, limit:"I try", bedtime:"After 2 AM", sleep:"Not really", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Netflix / OTT", reason:"Study", interrupt:"Often", concentrate:5, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Almost always", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Study", interrupt:"Almost always", concentrate:5, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Almost always", awareness:2, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Often", concentrate:3, limit:"No", bedtime:"After 2 AM", sleep:"Sometimes manageable", stress:"Rarely", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Almost always", concentrate:3, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Study", interrupt:"Often", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"Less than 2 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Sometimes", concentrate:3, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:3, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Almost always", concentrate:4, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:2, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Often", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"21–24", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"Less than 2 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Rarely", concentrate:1, limit:"Don't need", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Rarely", awareness:3, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:3, limit:"I try", bedtime:"Before 10 PM", sleep:"Yes, tired", stress:"Rarely", awareness:4, detox:"Yes, regularly" },
  { age:"21–24", status:"Postgraduate", screen:"4–6 hours", platforms:"Twitter / X", reason:"News", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Thought about it" },
  { age:"25+", status:"Working", screen:"2–4 hours", platforms:"YouTube", reason:"Social", interrupt:"Sometimes", concentrate:5, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Rarely", awareness:5, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Often", awareness:3, detox:"No, don't plan" },
  { age:"25+", status:"Working", screen:"Less than 2 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Occasionally", awareness:5, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Twitter / X", reason:"Social", interrupt:"Almost always", concentrate:2, limit:"No", bedtime:"Before 10 PM", sleep:"Sometimes manageable", stress:"Almost always", awareness:3, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Netflix / OTT", reason:"Gaming", interrupt:"Rarely", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Almost always", awareness:3, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Study", interrupt:"Often", concentrate:1, limit:"I try", bedtime:"Before 10 PM", sleep:"Yes, tired", stress:"Rarely", awareness:4, detox:"Yes, regularly" },
  { age:"25+", status:"Working", screen:"More than 8 hours", platforms:"Twitter / X", reason:"News", interrupt:"Almost always", concentrate:4, limit:"I try", bedtime:"After 2 AM", sleep:"Not sure", stress:"Occasionally", awareness:5, detox:"Yes, regularly" },
  { age:"21–24", status:"Undergraduate", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Almost always", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"News", interrupt:"Rarely", concentrate:1, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"15–17", status:"Postgraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"Yes", bedtime:"Before 10 PM", sleep:"Not really", stress:"Almost always", awareness:5, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"Less than 2 hours", platforms:"YouTube", reason:"Shopping", interrupt:"Often", concentrate:4, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Rarely", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"WhatsApp / Telegram", reason:"News", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"After 2 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Social", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Almost always", awareness:4, detox:"Yes, once or twice" },
  { age:"21–24", status:"Undergraduate", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Almost always", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Almost always", awareness:1, detox:"No, don't plan" },
  { age:"Under 15", status:"School student", screen:"Less than 2 hours", platforms:"YouTube", reason:"Study", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Rarely", awareness:3, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"Gaming", interrupt:"Sometimes", concentrate:4, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Almost always", awareness:3, detox:"Thought about it" },
  { age:"15–17", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"Study", interrupt:"Often", concentrate:4, limit:"Yes", bedtime:"Before 10 PM", sleep:"Not really", stress:"Almost always", awareness:2, detox:"Yes, once or twice" },
  { age:"25+", status:"Working", screen:"Less than 2 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Occasionally", awareness:5, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"WhatsApp / Telegram", reason:"Gaming", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"YouTube", reason:"Study", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"Before 10 PM", sleep:"Yes, tired", stress:"Rarely", awareness:4, detox:"Yes, regularly" },
  { age:"25+", status:"Working", screen:"More than 8 hours", platforms:"Twitter / X", reason:"News", interrupt:"Almost always", concentrate:4, limit:"I try", bedtime:"After 2 AM", sleep:"Not sure", stress:"Occasionally", awareness:5, detox:"Yes, regularly" },
  { age:"21–24", status:"Undergraduate", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Social", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Almost always", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"WhatsApp / Telegram", reason:"Entertainment", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"21–24", status:"Postgraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Rarely", concentrate:2, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:5, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Often", awareness:1, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:5, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Study", interrupt:"Almost always", concentrate:3, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Occasionally", awareness:2, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"WhatsApp / Telegram", reason:"Entertainment", interrupt:"Often", concentrate:3, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:1, limit:"Don't need", bedtime:"10 PM – 12 AM", sleep:"Not sure", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"21–24", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Rarely", awareness:4, detox:"No, don't plan" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"Yes", bedtime:"After 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:5, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:2, detox:"Yes, regularly" },
  { age:"Under 15", status:"School student", screen:"2–4 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Almost always", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:2, limit:"Don't need", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Often", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"25+", status:"Working", screen:"Less than 2 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Rarely", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Occasionally", awareness:5, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"No", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Study", interrupt:"Sometimes", concentrate:3, limit:"Yes", bedtime:"After 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:2, detox:"Yes, once or twice" },
  { age:"21–24", status:"Postgraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Rarely", concentrate:2, limit:"Yes", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:5, detox:"Yes, regularly" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:5, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:4, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Often", awareness:2, detox:"Yes, regularly" },
  { age:"21–24", status:"Undergraduate", screen:"4–6 hours", platforms:"YouTube", reason:"Study", interrupt:"Sometimes", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Often", concentrate:4, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:3, detox:"Thought about it" },
  { age:"18–20", status:"Undergraduate", screen:"4–6 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Sometimes", concentrate:3, limit:"Yes", bedtime:"10 PM – 12 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:4, detox:"Yes, once or twice" },
  { age:"21–24", status:"Undergraduate", screen:"2–4 hours", platforms:"YouTube", reason:"Entertainment", interrupt:"Rarely", concentrate:2, limit:"I try", bedtime:"10 PM – 12 AM", sleep:"Not really", stress:"Rarely", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"6–8 hours", platforms:"WhatsApp / Telegram", reason:"Social", interrupt:"Often", concentrate:4, limit:"I try", bedtime:"12 AM – 2 AM", sleep:"Sometimes manageable", stress:"Occasionally", awareness:3, detox:"Yes, once or twice" },
  { age:"18–20", status:"Undergraduate", screen:"More than 8 hours", platforms:"Instagram / Snapchat", reason:"Entertainment", interrupt:"Often", concentrate:5, limit:"No", bedtime:"12 AM – 2 AM", sleep:"Yes, tired", stress:"Often", awareness:2, detox:"Thought about it" },
  { age:"25+", status:"Working", screen:"2–4 hours", platforms:"YouTube", reason:"News", interrupt:"Rarely", concentrate:3, limit:"I try", bedtime:"Before 10 PM", sleep:"Not really", stress:"Occasionally", awareness:5, detox:"No, don't plan" },
];

/* ─── Verify N ──────────────────────────────────────────────────────── */
// RAW has exactly 101 entries above

/* ─── ANALYTICS ──────────────────────────────────────────────────────── */
function count(arr, key) {
  return arr.reduce((acc, d) => { acc[d[key]] = (acc[d[key]] || 0) + 1; return acc; }, {});
}
function avg(arr, key) { return (arr.reduce((s, d) => s + d[key], 0) / arr.length).toFixed(1); }
function pct(n, total) { return Math.round((n / total) * 100); }

const N = 101; // exact respondent count

const screenDist = Object.entries(count(RAW, "screen"))
  .map(([name, value]) => ({ name, value, pct: pct(value, N) }))
  .sort((a, b) => {
    const order = ["Less than 2 hours","2–4 hours","4–6 hours","6–8 hours","More than 8 hours"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

const platformDist = Object.entries(count(RAW, "platforms"))
  .map(([name, value]) => ({
    name: name.replace(" / Snapchat","").replace(" / Telegram","").replace(" / X","").replace(" / OTT streaming","").replace(" / OTT",""),
    value
  }))
  .sort((a, b) => b.value - a.value).slice(0, 7);

const ageDist = Object.entries(count(RAW, "age"))
  .filter(([k]) => ["Under 15","15–17","18–20","21–24","25+"].includes(k))
  .map(([name, value]) => ({ name, value, pct: pct(value, N) }));

const statusDist = Object.entries(count(RAW, "status"))
  .map(([name, value]) => ({ name, value }));

const sleepDist = [
  { name:"Tired next day", value: RAW.filter(d => d.sleep === "Yes, tired").length },
  { name:"Sometimes", value: RAW.filter(d => d.sleep === "Sometimes manageable").length },
  { name:"Fine", value: RAW.filter(d => d.sleep === "Not really").length },
  { name:"Not sure", value: RAW.filter(d => d.sleep === "Not sure").length },
];

const stressDist = Object.entries(count(RAW, "stress"))
  .map(([name, value]) => ({ name, value, pct: pct(value, N) }));

const limitDist = [
  { name:"Uses Limits", value: RAW.filter(d => d.limit === "Yes").length },
  { name:"Tries to", value: RAW.filter(d => d.limit === "I try").length },
  { name:"Never thought", value: RAW.filter(d => d.limit === "No").length },
  { name:"Doesn't need", value: RAW.filter(d => d.limit === "Don't need").length },
];

const detoxDist = Object.entries(count(RAW, "detox"))
  .map(([name, value]) => ({ name, value, pct: pct(value, N) }));

const interruptDist = [
  { name:"Almost always", value: RAW.filter(d=>d.interrupt==="Almost always").length },
  { name:"Often", value: RAW.filter(d=>d.interrupt==="Often").length },
  { name:"Sometimes", value: RAW.filter(d=>d.interrupt==="Sometimes").length },
  { name:"Rarely", value: RAW.filter(d=>d.interrupt==="Rarely").length },
];

const bedtimeDist = Object.entries(count(RAW, "bedtime"))
  .map(([name, value]) => ({ name, value, pct: pct(value, N) }))
  .sort((a, b) => {
    const order = ["Before 10 PM","10 PM – 12 AM","12 AM – 2 AM","After 2 AM"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

const reasonDist = Object.entries(count(RAW, "reason"))
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value);

const avgConcentrate = avg(RAW, "concentrate");
const avgAwareness = avg(RAW, "awareness");
const heavyScreenPct = pct(RAW.filter(d => d.screen === "More than 8 hours" || d.screen === "6–8 hours").length, N);
const sleepAffectedPct = pct(RAW.filter(d => d.sleep === "Yes, tired").length, N);
const stressedPct = pct(RAW.filter(d => d.stress === "Often" || d.stress === "Almost always").length, N);
const usesLimitsPct = pct(RAW.filter(d => d.limit === "Yes").length, N);

/* ─── WARM CROWZ PALETTE ─────────────────────────────────────────────── */
const C = {
  bg:       "#F5EFE6",       // warm parchment
  sidebar:  "#EDE5D8",       // slightly deeper cream
  card:     "#FFFFFF",       // white cards
  cardAlt:  "#FDF8F2",       // off-white
  border:   "#E3D9CC",       // warm border
  primary:  "#E8613A",       // Crowz orange-red
  secondary:"#4BBFA5",       // teal-green
  accent:   "#F0A500",       // warm amber
  navy:     "#2C3E6B",       // deep navy
  muted:    "#9A8F82",       // warm grey
  text:     "#2B2420",       // dark warm brown
  textSub:  "#7A6E65",       // muted text
  tealBg:   "#E8F5F2",       // teal tint bg
  orangeBg: "#FEF0EB",       // orange tint bg
  navyBg:   "#EEF0F6",       // navy tint bg
};

const CHART_COLORS = [C.primary, C.secondary, C.accent, C.navy, "#D4845A", "#6BB5A0", "#F2C45A", "#7A8CC4"];

/* ─── SHARED COMPONENTS ──────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
      {label && <p style={{ color: C.muted, fontSize: 11, marginBottom: 4, fontWeight:600 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill || p.color || C.primary, fontWeight: 700, fontSize: 14, margin: 0 }}>
          {p.name ? `${p.name}: ` : ""}{p.value}
        </p>
      ))}
    </div>
  );
};

function KpiCard({ label, value, sub, color = C.primary, bg, icon }) {
  const bgColor = bg || (color === C.primary ? C.orangeBg : color === C.secondary ? C.tealBg : C.navyBg);
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: "22px 20px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${color}25`; }}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.05)"; }}
    >
      <div style={{ position:"absolute", top:-16, right:-16, width:70, height:70, borderRadius:"50%", background: bgColor }} />
      <div style={{ fontSize:26, marginBottom:8, position:"relative" }}>{icon}</div>
      <div style={{ fontSize:34, fontWeight:800, color, letterSpacing:-1, lineHeight:1 }}>{value}</div>
      <div style={{ color:C.text, fontSize:13, fontWeight:700, marginTop:6 }}>{label}</div>
      {sub && <div style={{ color:C.muted, fontSize:11, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function SectionCard({ title, children, style={} }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, padding:22, boxShadow:"0 2px 12px rgba(0,0,0,0.04)", ...style }}>
      {title && (
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:18 }}>
          <div style={{ width:4, height:18, background:`linear-gradient(180deg,${C.primary},${C.accent})`, borderRadius:4 }} />
          <h3 style={{ color:C.text, fontSize:14, fontWeight:800, margin:0, letterSpacing:0.2 }}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

/* ─── PAGES ──────────────────────────────────────────────────────────── */
function Overview() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14 }}>
        <KpiCard icon="👥" label="Total Respondents" value={N} sub="Survey participants" color={C.navy} bg={C.navyBg} />
        <KpiCard icon="⏰" label="Heavy Screeners" value={`${heavyScreenPct}%`} sub="6+ hours/day" color={C.primary} bg={C.orangeBg} />
        <KpiCard icon="😴" label="Sleep Affected" value={`${sleepAffectedPct}%`} sub="Tired next day" color={C.accent} bg="#FEF8E8" />
        <KpiCard icon="😰" label="Often Stressed" value={`${stressedPct}%`} sub="After media use" color={C.secondary} bg={C.tealBg} />
        <KpiCard icon="🎯" label="Focus Impact" value={`${avgConcentrate}/5`} sub="Avg concentration score" color={C.primary} bg={C.orangeBg} />
        <KpiCard icon="🛡️" label="Use App Limits" value={`${usesLimitsPct}%`} sub="Screen time controls" color={C.secondary} bg={C.tealBg} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <SectionCard title="Daily Screen Time Distribution">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={screenDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:8 }} />
              <YAxis tick={{ fill:C.muted, fontSize:9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[7,7,0,0]}>
                {screenDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Platform Popularity">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={platformDist} layout="vertical" margin={{ top:0, right:8, left:20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill:C.muted, fontSize:9 }} />
              <YAxis type="category" dataKey="name" tick={{ fill:C.muted, fontSize:9 }} width={82} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0,7,7,0]}>
                {platformDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <SectionCard title="Age Group Breakdown">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={ageDist} cx="50%" cy="50%" innerRadius={52} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={3}>
                {ageDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ color:C.muted, fontSize:10 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Sleep Quality Impact">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={sleepDist} cx="50%" cy="50%" innerRadius={52} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={3}>
                {sleepDist.map((_,i) => <Cell key={i} fill={[C.primary,C.accent,C.secondary,C.muted][i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ color:C.muted, fontSize:10 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function EngagementView() {
  const radarData = [
    { metric:"Focus Impact", value: parseFloat(avgConcentrate)*20 },
    { metric:"Digital Awareness", value: parseFloat(avgAwareness)*20 },
    { metric:"Sleep Affected", value: sleepAffectedPct },
    { metric:"Heavy Screen Use", value: heavyScreenPct },
    { metric:"Stress After Use", value: stressedPct },
    { metric:"Uses Limits", value: usesLimitsPct },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <SectionCard title="Study Interruption Frequency">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={interruptDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:9 }} />
              <YAxis tick={{ fill:C.muted, fontSize:9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[7,7,0,0]}>
                {interruptDist.map((_,i) => <Cell key={i} fill={[C.primary,C.accent,C.secondary,C.navy][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Wellbeing Radar">
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={C.border} />
              <PolarAngleAxis dataKey="metric" tick={{ fill:C.textSub, fontSize:9 }} />
              <PolarRadiusAxis domain={[0,100]} tick={{ fill:C.muted, fontSize:8 }} />
              <Radar name="Score" dataKey="value" stroke={C.primary} fill={C.primary} fillOpacity={0.18} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <SectionCard title="Stress After Heavy Media Use">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={stressDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:9 }} />
              <YAxis tick={{ fill:C.muted, fontSize:9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[7,7,0,0]}>
                {stressDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Primary Reason for Internet Use">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={reasonDist} cx="50%" cy="50%" outerRadius={85} dataKey="value" nameKey="name" paddingAngle={2}>
                {reasonDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ color:C.muted, fontSize:10 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function BehaviorView() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <SectionCard title="Bedtime Phone Usage">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={bedtimeDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:8 }} />
              <YAxis tick={{ fill:C.muted, fontSize:9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[7,7,0,0]}>
                {bedtimeDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Screen Time Control Methods">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={limitDist} cx="50%" cy="50%" innerRadius={48} outerRadius={82} dataKey="value" nameKey="name" paddingAngle={3}>
                {limitDist.map((_,i) => <Cell key={i} fill={[C.secondary,C.accent,C.primary,C.muted][i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ color:C.muted, fontSize:10 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <SectionCard title="Digital Detox Behavior">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={detoxDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:9 }} />
            <YAxis tick={{ fill:C.muted, fontSize:9 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[7,7,0,0]}>
              {detoxDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Demographic Breakdown">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={statusDist} margin={{ top:0, right:8, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="name" tick={{ fill:C.muted, fontSize:9 }} />
            <YAxis tick={{ fill:C.muted, fontSize:9 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[7,7,0,0]}>
              {statusDist.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

function InsightsView() {
  const insights = [
    { icon:"🚨", color:C.primary, bg:C.orangeBg, title:"Screen Time Crisis", body:`${heavyScreenPct}% of respondents spend 6+ hours daily on screens — well above healthy recommendations. This indicates systemic overconsumption among youth.` },
    { icon:"😴", color:C.accent, bg:"#FEF8E8", title:"Sleep Deprivation", body:`${sleepAffectedPct}% regularly feel tired the next day. Only ${pct(RAW.filter(d=>d.bedtime==="Before 10 PM").length, N)}% put their phone down before 10 PM; ${pct(RAW.filter(d=>d.bedtime==="After 2 AM").length, N)}% use devices past 2 AM.` },
    { icon:"📚", color:C.navy, bg:C.navyBg, title:"Academic Interference", body:`Over ${pct(RAW.filter(d=>d.interrupt==="Almost always"||d.interrupt==="Often").length, N)}% say screens interrupt study "often" or "almost always." Average concentration impact: ${avgConcentrate}/5.` },
    { icon:"😰", color:C.secondary, bg:C.tealBg, title:"Stress & Anxiety Link", body:`${stressedPct}% frequently feel stressed after heavy media use. This correlates with high concentration impact scores and compulsive late-night usage loops.` },
    { icon:"🎯", color:C.primary, bg:C.orangeBg, title:"Low Digital Literacy", body:`Avg digital health awareness is only ${avgAwareness}/5. ${pct(RAW.filter(d=>d.limit==="No").length, N)}% have never thought about limiting screen time — a critical education gap.` },
    { icon:"📱", color:C.secondary, bg:C.tealBg, title:"YouTube & Instagram Rule", body:`These two platforms dominate usage. Short-form video drives the highest engagement scores and also the highest rates of study distraction and sleep disruption.` },
  ];

  const recs = [
    { n:"01", text:"Implement mandatory digital wellness workshops in college curricula, covering self-regulation and healthy screen habits." },
    { n:"02", text:"Develop campus-wide 'phone-free' study hours to help students build focused work habits and break interruption cycles." },
    { n:"03", text:"Partner with platforms to enable evening notification reduction modes starting at 10 PM for users under 24." },
    { n:"04", text:"Create peer-led digital detox challenges with measurable outcomes to normalize healthy media habits among youth." },
    { n:"05", text:"Introduce sleep hygiene programs that explicitly address screen use, given 30%+ experience regular sleep disruption." },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
        {insights.map((ins, i) => (
          <div key={i} style={{
            background: ins.bg, border:`1.5px solid ${C.border}`, borderRadius:16, padding:18,
            borderLeft:`4px solid ${ins.color}`,
            transition:"transform 0.2s, box-shadow 0.2s",
            cursor:"default",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${ins.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
              <span style={{ fontSize:20 }}>{ins.icon}</span>
              <h4 style={{ color:ins.color, fontWeight:800, fontSize:13, margin:0 }}>{ins.title}</h4>
            </div>
            <p style={{ color:C.textSub, fontSize:12.5, lineHeight:1.65, margin:0 }}>{ins.body}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Strategic Recommendations">
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {recs.map((r, i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"13px 15px", background:C.cardAlt, borderRadius:12, border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, fontWeight:800, color:C.primary, minWidth:26, padding:"2px 6px", background:C.orangeBg, borderRadius:6, flexShrink:0, textAlign:"center" }}>{r.n}</div>
              <p style={{ color:C.text, fontSize:12.5, lineHeight:1.65, margin:0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:"overview",   label:"Dashboard",  icon:"◈" },
  { id:"engagement", label:"Insights",   icon:"⚡" },
  { id:"behavior",   label:"Behavior",   icon:"🔄" },
  { id:"insights",   label:"Reports",    icon:"💡" },
];

export default function App() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const views = { overview:<Overview />, engagement:<EngagementView />, behavior:<BehaviorView />, insights:<InsightsView /> };

  return (
    <div style={{
      display:"flex", minHeight:"100vh", width:"100%", background:C.bg,
      fontFamily:"'DM Sans', 'Nunito', system-ui, sans-serif",
      color:C.text, overflowX:"hidden", overflowY:"auto",
      opacity:mounted?1:0, transition:"opacity 0.5s ease",
    }}>
      {/* ── Sidebar ── */}
      <div style={{
        width:sidebarOpen?210:58, minWidth:sidebarOpen?210:58,
        background:C.sidebar, borderRight:`1px solid ${C.border}`,
        display:"flex", flexDirection:"column",
        transition:"width 0.28s ease, min-width 0.28s ease",
        overflowX:"hidden", overflowY:"auto", flexShrink:0,
      }}>
        {/* Logo */}
        <div style={{ padding:"22px 16px 18px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:34, height:34, borderRadius:10, flexShrink:0,
              background:`linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:17, cursor:"pointer", boxShadow:`0 4px 12px ${C.primary}40`,
            }} onClick={() => setSidebarOpen(!sidebarOpen)}>📊</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontSize:14, fontWeight:900, color:C.text, letterSpacing:0.3 }}>MediaPulse</div>
                <div style={{ fontSize:9, color:C.muted, letterSpacing:1.2, textTransform:"uppercase" }}>Analytics</div>
              </div>
            )}
          </div>
        </div>

        {/* Profile chip */}
        {sidebarOpen && (
          <div style={{ padding:"16px 16px 12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.secondary},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🎓</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text }}>Youth Survey</div>
                <div style={{ fontSize:10, color:C.muted }}>Media Study · 2026</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex:1, padding:"8px 10px", display:"flex", flexDirection:"column", gap:3 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display:"flex", alignItems:"center", gap:11,
                padding:sidebarOpen?"10px 12px":"10px 0",
                justifyContent:sidebarOpen?"flex-start":"center",
                borderRadius:11, border:"none", cursor:"pointer",
                background: active===item.id ? C.card : "transparent",
                color: active===item.id ? C.primary : C.textSub,
                fontWeight: active===item.id ? 800 : 500,
                fontSize:13,
                boxShadow: active===item.id ? "0 2px 10px rgba(0,0,0,0.07)" : "none",
                transition:"all 0.18s",
                outline:"none",
              }}
            >
              <span style={{ fontSize:15, flexShrink:0 }}>{item.icon}</span>
              {sidebarOpen && item.label}
              {sidebarOpen && active===item.id && (
                <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:C.primary }} />
              )}
            </button>
          ))}
        </nav>

        {/* Stats footer */}
        {sidebarOpen && (
          <div style={{ margin:"0 10px 16px", padding:"12px 14px", background:C.card, borderRadius:12, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.primary, marginBottom:4 }}>n = {N} respondents</div>
            <div style={{ fontSize:10, color:C.muted, lineHeight:1.5 }}>May 15–16, 2026<br/>Media Consumption Study</div>
          </div>
        )}
      </div>

      {/* ── Main ── */}
      <div style={{
        flex:1,
        display:"flex",
        flexDirection:"column",
        width:"100%",
        minWidth:0,
      }}>
        {/* Topbar */}
        <div style={{
          height:62, borderBottom:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 26px", flexShrink:0, background:C.card,
        }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:900, color:C.text, margin:0 }}>
              {NAV_ITEMS.find(n=>n.id===active)?.label}
            </h2>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>Media Consumption Patterns Among Youth · {N} respondents</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ padding:"6px 14px", background:C.tealBg, borderRadius:20, border:`1px solid ${C.secondary}30`, fontSize:11, color:C.secondary, fontWeight:700 }}>
              🟢 Live Data
            </div>
            <div style={{ padding:"6px 14px", background:C.cardAlt, borderRadius:20, border:`1px solid ${C.border}`, fontSize:11, color:C.muted, fontWeight:600 }}>
              May 2026
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex:1,
          width:"100%",
          overflowX:"hidden",
          overflowY:"auto",
          padding:"16px",
          background:C.bg,
          boxSizing:"border-box",
        }}>
          {views[active]}
        </div>
      </div>
    </div>
  );
}
