import { YesNo } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { displayRegistrationType } from "@/server/lib/registration-type-labels";
import type { RegistrationAdminStats } from "@/types/admin-dashboard";

function decimalToNumber(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "object" && value !== null && "toNumber" in value) {
    const n = (value as { toNumber: () => number }).toNumber();
    return Number.isFinite(n) ? n : 0;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function getRegistrationAdminStats(): Promise<RegistrationAdminStats> {
  const baseWhere = { deletedAt: null as null };
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    total,
    byType,
    today,
    pendingPayments,
    submittedFree,
    completedPayments,
    pendingVerifications,
    approved,
    verified,
    pendingAccommodation,
    accommodation,
    revenueAgg,
  ] = await Promise.all([
    prisma.registration.count({ where: baseWhere }),
    prisma.registration.groupBy({
      by: ["registrationType"],
      where: baseWhere,
      _count: { id: true },
    }),
    prisma.registration.count({
      where: { ...baseWhere, createdAt: { gte: startOfToday } },
    }),
    prisma.registration.count({
      where: { ...baseWhere, paymentStatus: "Pending_Payment" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, paymentStatus: "Submitted" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, paymentStatus: "Paid" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, registrationStatus: "Pending" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, registrationStatus: "Approved" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, registrationStatus: "Verified" },
    }),
    prisma.registration.count({
      where: { ...baseWhere, accommodationStatus: "Requested" },
    }),
    prisma.registration.count({
      where: {
        ...baseWhere,
        OR: [
          { accommodationRequired: YesNo.Yes },
          { accommodationStatus: "Requested" },
        ],
      },
    }),
    prisma.registration.aggregate({
      where: { ...baseWhere, paymentStatus: "Paid" },
      _sum: { registrationFee: true },
    }),
  ]);

  const countByLabel = (label: string) =>
    byType
      .filter(
        (row) => displayRegistrationType(String(row.registrationType)) === label
      )
      .reduce((sum, row) => sum + row._count.id, 0);

  return {
    total,
    delegate: countByLabel("Delegate Registration"),
    conclave: countByLabel("Conclave"),
    olympiad: countByLabel("Olympiad"),
    awards: countByLabel("Awards"),
    bestPractices: countByLabel("Best Practices"),
    accommodation,
    today,
    pendingPayments,
    submittedFree,
    completedPayments,
    pendingVerifications,
    approved,
    verified,
    pendingAccommodation,
    revenue: decimalToNumber(revenueAgg._sum.registrationFee),
  };
}

export async function getDashboardStats() {
  const [
    totalRegistrations,
    recentRegistrations,
    paidCount,
    pendingPaymentCount,
    recentUploads,
    committeeCount,
    memberCount,
    eventCount,
    feedbackCount,
    contactCount,
    newsletterCount,
  ] = await Promise.all([
    prisma.registration.count({ where: { deletedAt: null } }),
    prisma.registration.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        registrationId: true,
        fullName: true,
        registrationType: true,
        paymentStatus: true,
        createdAt: true,
      },
    }),
    prisma.registration.count({ where: { deletedAt: null, paymentStatus: "Paid" } }),
    prisma.registration.count({ where: { deletedAt: null, paymentStatus: "Pending_Payment" } }),
    prisma.uploadedFile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        originalName: true,
        bucket: true,
        createdAt: true,
      },
    }),
    prisma.committee.count({ where: { deletedAt: null } }),
    prisma.committeeMember.count({ where: { deletedAt: null } }),
    prisma.event.count({ where: { deletedAt: null } }),
    prisma.feedback.count({ where: { deletedAt: null } }),
    prisma.contactMessage.count({ where: { deletedAt: null } }),
    prisma.newsletterSubscription.count({ where: { deletedAt: null, status: "subscribed" } }),
  ]);

  return {
    registrations: {
      total: totalRegistrations,
      paid: paidCount,
      pendingPayment: pendingPaymentCount,
      recent: recentRegistrations,
    },
    payments: {
      paid: paidCount,
      pending: pendingPaymentCount,
    },
    uploads: { recent: recentUploads },
    committees: { committees: committeeCount, members: memberCount },
    events: { total: eventCount },
    feedback: { total: feedbackCount },
    contact: { total: contactCount },
    newsletter: { subscribed: newsletterCount },
  };
}
