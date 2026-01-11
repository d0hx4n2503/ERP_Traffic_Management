import { useEffect, useState } from 'react';
import licenseService from '@/services/licenseService';
import type { LicenseStatus } from '@/types';

export function useLicenseStats() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [statusStats, setStatusStats] = useState<{
        distribution: { status: LicenseStatus; count: number }[];
        total: number;
    } | null>(null);

    const [typeStats, setTypeStats] = useState<{
        distribution: { license_type: string; count: number }[];
        total: number;
    } | null>(null);

    const [typeDetailStats, setTypeDetailStats] = useState<{
        distribution: {
            license_type: string;
            total: number;
            by_status: { status: LicenseStatus; count: number }[];
        }[];
        grand_total: number;
    } | null>(null);

    const [cityStats, setCityStats] = useState<{
        distribution: {
            owner_city: string;
            total: number;
            by_status: { status: LicenseStatus; count: number }[];
        }[];
        grand_total: number;
    } | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const [statusData, typeData, typeDetailData, cityData] = await Promise.all([
                    licenseService.getStatusStats(),
                    licenseService.getLicenseTypeStats(),
                    licenseService.getLicenseTypeDetailStats(),
                    licenseService.getCityDetailStats(),
                ]);

                // Debug - in ra dữ liệu thật nhận được
                console.log('=== DEBUG STATISTICS ===');
                console.log('statusStats:', statusData);
                console.log('typeStats:', typeData);
                console.log('typeDetailStats:', typeDetailData);
                console.log('cityStats:', cityData);

                setStatusStats(statusData);
                setTypeStats(typeData);
                setTypeDetailStats(typeDetailData);
                setCityStats(cityData);
            } catch (err: any) {
                console.error('Lỗi fetch statistics:', err);
                setError(err.message || 'Không thể tải thống kê');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return {
        loading,
        error,
        statusStats,
        typeStats,
        typeDetailStats,
        cityStats,
    };
}