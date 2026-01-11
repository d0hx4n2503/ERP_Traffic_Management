export enum VehicleType {
    // === Ô TÔ ===
    CAR = 'car',                         // Ô tô con
    TAXI = 'taxi',                       // Taxi
    ELECTRIC_CAR = 'electric_car',       // Ô tô điện
    PICKUP = 'pickup',                   // Bán tải
    VAN = 'van',                         // Xe van

    TRUCK_LIGHT = 'truck_light',         // Xe tải nhẹ (<3.5T)
    TRUCK_MEDIUM = 'truck_medium',       // Xe tải trung (3.5T–7.5T)
    TRUCK_HEAVY = 'truck_heavy',          // Xe tải nặng (>7.5T)
    CONTAINER_TRUCK = 'container_truck', // Xe container
    DUMP_TRUCK = 'dump_truck',            // Xe ben

    BUS = 'bus',                         // Xe khách
    MINI_BUS = 'mini_bus',               // Xe buýt mini
    COACH = 'coach',                     // Xe khách giường nằm
    SCHOOL_BUS = 'school_bus',           // Xe đưa đón học sinh

    TRACTOR = 'tractor',                 // Xe đầu kéo
    SPECIAL_TRUCK = 'special_truck',     // Xe chuyên dụng

    // === XE MÁY ===
    MOTORBIKE = 'motorbike',             // Xe máy
    SCOOTER = 'scooter',                 // Xe tay ga
    MANUAL_BIKE = 'manual_bike',         // Xe số
    ELECTRIC_BIKE = 'electric_bike',     // Xe máy điện
    MOPED = 'moped',                     // Xe gắn máy (<50cc)

    // === XE ĐẠP ===
    BICYCLE = 'bicycle',                 // Xe đạp
    ELECTRIC_BICYCLE = 'electric_bicycle', // Xe đạp điện

    // === XE ĐẶC THÙ ===
    AMBULANCE = 'ambulance',             // Xe cứu thương
    FIRE_TRUCK = 'fire_truck',            // Xe cứu hỏa
    POLICE_CAR = 'police_car',            // Xe công an
    MILITARY_VEHICLE = 'military_vehicle',// Xe quân đội

    AGRICULTURAL_VEHICLE = 'agricultural_vehicle', // Xe nông nghiệp
    CONSTRUCTION_VEHICLE = 'construction_vehicle', // Xe công trình
    FORKLIFT = 'forklift',               // Xe nâng
    ROAD_ROLLER = 'road_roller',         // Xe lu

    // === PHƯƠNG TIỆN KHÁC ===
    THREE_WHEELER = 'three_wheeler',     // Xe ba gác
    FOUR_WHEELER = 'four_wheeler',       // Xe bốn bánh tự chế
    TRAILER = 'trailer',                 // Rơ-moóc
    SEMI_TRAILER = 'semi_trailer',       // Sơ-mi rơ-moóc

    OTHER = 'other',                     // Khác
}


export const VEHICLE_TYPE_LABEL: Record<VehicleType, string> = {
    [VehicleType.CAR]: 'Ô tô con',
    [VehicleType.TAXI]: 'Taxi',
    [VehicleType.ELECTRIC_CAR]: 'Ô tô điện',
    [VehicleType.PICKUP]: 'Xe bán tải',
    [VehicleType.VAN]: 'Xe van',

    [VehicleType.TRUCK_LIGHT]: 'Xe tải nhẹ',
    [VehicleType.TRUCK_MEDIUM]: 'Xe tải trung',
    [VehicleType.TRUCK_HEAVY]: 'Xe tải nặng',
    [VehicleType.CONTAINER_TRUCK]: 'Xe container',
    [VehicleType.DUMP_TRUCK]: 'Xe ben',

    [VehicleType.BUS]: 'Xe buýt',
    [VehicleType.MINI_BUS]: 'Xe buýt mini',
    [VehicleType.COACH]: 'Xe khách giường nằm',
    [VehicleType.SCHOOL_BUS]: 'Xe đưa đón học sinh',

    [VehicleType.TRACTOR]: 'Xe đầu kéo',
    [VehicleType.SPECIAL_TRUCK]: 'Xe chuyên dụng',

    [VehicleType.MOTORBIKE]: 'Xe máy',
    [VehicleType.SCOOTER]: 'Xe tay ga',
    [VehicleType.MANUAL_BIKE]: 'Xe số',
    [VehicleType.ELECTRIC_BIKE]: 'Xe máy điện',
    [VehicleType.MOPED]: 'Xe gắn máy (<50cc)',

    [VehicleType.BICYCLE]: 'Xe đạp',
    [VehicleType.ELECTRIC_BICYCLE]: 'Xe đạp điện',

    [VehicleType.AMBULANCE]: 'Xe cứu thương',
    [VehicleType.FIRE_TRUCK]: 'Xe cứu hỏa',
    [VehicleType.POLICE_CAR]: 'Xe công an',
    [VehicleType.MILITARY_VEHICLE]: 'Xe quân đội',

    [VehicleType.AGRICULTURAL_VEHICLE]: 'Xe nông nghiệp',
    [VehicleType.CONSTRUCTION_VEHICLE]: 'Xe công trình',
    [VehicleType.FORKLIFT]: 'Xe nâng',
    [VehicleType.ROAD_ROLLER]: 'Xe lu',

    [VehicleType.THREE_WHEELER]: 'Xe ba gác',
    [VehicleType.FOUR_WHEELER]: 'Xe bốn bánh',
    [VehicleType.TRAILER]: 'Rơ-moóc',
    [VehicleType.SEMI_TRAILER]: 'Sơ-mi rơ-moóc',

    [VehicleType.OTHER]: 'Khác',
};

export const VEHICLE_TYPE_GROUPS = {
    car: [
        VehicleType.CAR,
        VehicleType.TAXI,
        VehicleType.ELECTRIC_CAR,
        VehicleType.PICKUP,
        VehicleType.VAN,
    ],
    truck: [
        VehicleType.TRUCK_LIGHT,
        VehicleType.TRUCK_MEDIUM,
        VehicleType.TRUCK_HEAVY,
        VehicleType.CONTAINER_TRUCK,
        VehicleType.DUMP_TRUCK,
        VehicleType.TRACTOR,
    ],
    motorbike: [
        VehicleType.MOTORBIKE,
        VehicleType.SCOOTER,
        VehicleType.MANUAL_BIKE,
        VehicleType.ELECTRIC_BIKE,
        VehicleType.MOPED,
    ],
    special: [
        VehicleType.AMBULANCE,
        VehicleType.FIRE_TRUCK,
        VehicleType.POLICE_CAR,
        VehicleType.MILITARY_VEHICLE,
        VehicleType.CONSTRUCTION_VEHICLE,
    ],
};
