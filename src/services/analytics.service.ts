/**
 * Advanced dashboard analytics service
 * Provides comprehensive metrics and insights
 */

export interface DashboardMetrics {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  onLeaveToday: number;
  attendanceRate: number;
  pendingLeaves: number;
  approvedLeavesMonth: number;
  payrollProcessed: number;
  payrollPending: number;
}

export interface EmployeeStats {
  id: string;
  name: string;
  attendanceRate: number;
  leavesUsed: number;
  leavesBalance: number;
  department: string;
  lastCheckIn?: Date;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

export interface PayrollSummary {
  month: string;
  totalEmployees: number;
  totalPayroll: number;
  processed: number;
  pending: number;
  failed: number;
}

/**
 * Analytics calculations
 */
export const analyticsService = {
  /**
   * Calculate attendance rate
   */
  calculateAttendanceRate(present: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  },

  /**
   * Calculate leave balance
   */
  calculateLeaveBalance(
    allocatedDays: number,
    usedDays: number
  ): number {
    return Math.max(allocatedDays - usedDays, 0);
  },

  /**
   * Calculate average salary increase
   */
  calculateSalaryMetrics(salaries: number[]): {
    average: number;
    median: number;
    min: number;
    max: number;
  } {
    if (salaries.length === 0) {
      return { average: 0, median: 0, min: 0, max: 0 };
    }

    const sorted = [...salaries].sort((a, b) => a - b);
    const average = salaries.reduce((a, b) => a + b, 0) / salaries.length;
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    return {
      average: Math.round(average),
      median: Math.round(median),
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  },

  /**
   * Generate attendance trend analysis
   */
  generateTrendAnalysis(
    current: number,
    previous: number
  ): { value: number; direction: "up" | "down" } {
    if (previous === 0) {
      return { value: 0, direction: "up" };
    }

    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      direction: change >= 0 ? "up" : "down",
    };
  },

  /**
   * Categorize employees by performance
   */
  categorizePerformance(
    attendanceRate: number
  ): "excellent" | "good" | "average" | "poor" {
    if (attendanceRate >= 95) return "excellent";
    if (attendanceRate >= 85) return "good";
    if (attendanceRate >= 75) return "average";
    return "poor";
  },

  /**
   * Calculate work anniversary
   */
  getWorkAnniversary(joiningDate: Date): {
    yearsOfService: number;
    nextAnniversary: Date;
    daysUntilAnniversary: number;
  } {
    const today = new Date();
    const yearsOfService = Math.floor(
      (today.getTime() - joiningDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    const nextAnniversary = new Date(joiningDate);
    nextAnniversary.setFullYear(today.getFullYear());

    if (nextAnniversary < today) {
      nextAnniversary.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilAnniversary = Math.ceil(
      (nextAnniversary.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
    );

    return { yearsOfService, nextAnniversary, daysUntilAnniversary };
  },

  /**
   * Format salary with currency
   */
  formatSalary(amount: number, currency: string = "INR"): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  },
};

/**
 * Report generation helper
 */
export const reportService = {
  /**
   * Export data to CSV
   */
  exportToCSV<T>(
    data: T[],
    filename: string,
    columns: (keyof T)[]
  ): void {
    const headers = columns.join(",");
    const rows = data.map((item) =>
      columns.map((col) => JSON.stringify(item[col] || "")).join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().getTime()}.csv`;
    a.click();
  },

  /**
   * Generate PDF metadata
   */
  getPDFMetadata(
    title: string,
    subject: string
  ): { title: string; subject: string; creator: string; createdAt: string } {
    return {
      title,
      subject,
      creator: "Dayflow HRMS",
      createdAt: new Date().toISOString(),
    };
  },
};
