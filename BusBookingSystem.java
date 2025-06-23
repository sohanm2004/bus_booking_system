import java.util.*;

class Bus {
    String id, source, destination, date, time;
    boolean isAC;
    int totalSeats;
    int availableSeats;
    double fare;

    public Bus(String id, String source, String destination, String date, String time,
               boolean isAC, int totalSeats, int availableSeats, double fare) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.isAC = isAC;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.fare = fare;
    }

    public void showDetails() {
        System.out.println("Bus ID: " + id +
                " | Time: " + time +
                " | Type: " + (isAC ? "AC" : "Non-AC") +
                " | Fare: ₹" + fare +
                " | Available Seats: " + availableSeats +
                " / " + totalSeats);
    }
}

public class BusBookingSystem {
    static List<Bus> buses = new ArrayList<>();

    public static void loadSampleBuses() {
        // Bangalore to Mumbai
        buses.add(new Bus("B001", "Bangalore", "Mumbai", "01-07-2025", "09:00", true, 40, 15, 1200));
        buses.add(new Bus("B002", "Bangalore", "Mumbai", "01-07-2025", "18:00", false, 40, 20, 900));
        buses.add(new Bus("B006", "Bangalore", "Mumbai", "02-07-2025", "06:00", true, 40, 14, 1150));
        buses.add(new Bus("B007", "Bangalore", "Mumbai", "03-07-2025", "14:00", true, 40, 22, 1300));
        buses.add(new Bus("B008", "Bangalore", "Mumbai", "03-07-2025", "20:00", false, 40, 19, 950));

        // Delhi to Chennai
        buses.add(new Bus("B003", "Delhi", "Chennai", "01-07-2025", "07:00", true, 40, 8, 1500));
        buses.add(new Bus("B009", "Delhi", "Chennai", "02-07-2025", "16:00", false, 40, 30, 1200));
        buses.add(new Bus("B010", "Delhi", "Chennai", "03-07-2025", "11:00", true, 40, 20, 1600));

        // Hyderabad to Kerala
        buses.add(new Bus("B004", "Hyderabad", "Kerala", "02-07-2025", "10:00", false, 40, 25, 800));
        buses.add(new Bus("B011", "Hyderabad", "Kerala", "03-07-2025", "08:30", true, 40, 18, 1100));

        // Bangalore to Kerala
        buses.add(new Bus("B005", "Bangalore", "Kerala", "02-07-2025", "16:30", true, 40, 12, 1000));
        buses.add(new Bus("B012", "Bangalore", "Kerala", "03-07-2025", "06:00", false, 40, 30, 850));

        // Mumbai to Hyderabad
        buses.add(new Bus("B013", "Mumbai", "Hyderabad", "03-07-2025", "09:00", true, 40, 20, 1400));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        loadSampleBuses();

        System.out.println("🚌 Welcome to Bus Booking System");

        // Step 1: Select Source
        Set<String> sources = new TreeSet<>();
        for (Bus b : buses) {
            sources.add(b.source);
        }

        System.out.println("\n📍 Available Source Cities: " + sources);
        System.out.print("Enter Source City: ");
        String source = sc.nextLine();

        if (!sources.contains(source)) {
            System.out.println("❌ Invalid source city.");
            return;
        }

        // Step 2: Select Destination
        Set<String> destinations = new TreeSet<>();
        for (Bus b : buses) {
            if (b.source.equalsIgnoreCase(source)) {
                destinations.add(b.destination);
            }
        }

        if (destinations.isEmpty()) {
            System.out.println("❌ No destination cities from this source.");
            return;
        }

        System.out.println("🎯 Destinations from " + source + ": " + destinations);
        System.out.print("Enter Destination City: ");
        String destination = sc.nextLine();

        if (!destinations.contains(destination)) {
            System.out.println("❌ Invalid destination city.");
            return;
        }

        // Step 3: Filter route
        List<Bus> matchingRoute = new ArrayList<>();
        for (Bus b : buses) {
            if (b.source.equalsIgnoreCase(source) && b.destination.equalsIgnoreCase(destination)) {
                matchingRoute.add(b);
            }
        }

        if (matchingRoute.isEmpty()) {
            System.out.println("❌ No buses found for this route.");
            return;
        }

        System.out.println("\n📅 Available Buses from " + source + " to " + destination + ":");
        for (Bus b : matchingRoute) {
            System.out.println("- Date: " + b.date + " | Time: " + b.time + " | " + (b.isAC ? "AC" : "Non-AC") + " | Fare: ₹" + b.fare);
        }

        System.out.print("\nEnter Journey Date (DD-MM-YYYY): ");
        String date = sc.nextLine();

        if (!date.matches("\\d{2}-\\d{2}-\\d{4}")) {
            System.out.println("❌ Invalid date format. Use DD-MM-YYYY.");
            return;
        }

        List<Bus> available = new ArrayList<>();
        for (Bus b : matchingRoute) {
            if (b.date.equals(date)) {
                available.add(b);
            }
        }

        if (available.isEmpty()) {
            System.out.println("❌ No buses on this date.");
            return;
        }

        System.out.println("\n✅ Buses Available on " + date + ":");
        for (int i = 0; i < available.size(); i++) {
            System.out.print((i + 1) + ". ");
            available.get(i).showDetails();
        }

        System.out.print("\nSelect a bus by number: ");
        int choice;
        try {
            choice = sc.nextInt();
            sc.nextLine(); // clear buffer
        } catch (InputMismatchException e) {
            System.out.println("❌ Invalid input. Must be a number.");
            return;
        }

        if (choice < 1 || choice > available.size()) {
            System.out.println("❌ Invalid selection.");
            return;
        }

        Bus selected = available.get(choice - 1);

        System.out.print("Enter number of seats to book: ");
        int seats;
        try {
            seats = sc.nextInt();
            sc.nextLine();
        } catch (InputMismatchException e) {
            System.out.println("❌ Invalid input. Must be a number.");
            return;
        }

        if (seats <= 0 || seats > selected.availableSeats) {
            System.out.println("❌ Not enough seats available.");
            return;
        }

        double totalAmount = seats * selected.fare;

        // Step 4: Payment
        System.out.println("\n💳 Payment Options:");
        System.out.println("1. UPI");
        System.out.println("2. Credit/Debit Card");
        System.out.print("Select payment method (1 or 2): ");
        int paymentMethod;
        try {
            paymentMethod = sc.nextInt();
            sc.nextLine();
        } catch (InputMismatchException e) {
            System.out.println("❌ Invalid input.");
            return;
        }

        String paymentType = "";
        switch (paymentMethod) {
            case 1:
                paymentType = "UPI";
                System.out.print("Enter UPI ID: ");
                sc.nextLine(); // Assume valid input
                break;
            case 2:
                paymentType = "Card";
                System.out.print("Enter Card Number: ");
                sc.nextLine(); // Assume valid input
                break;
            default:
                System.out.println("❌ Invalid payment option.");
                return;
        }

        // Confirm booking
        selected.availableSeats -= seats;

        System.out.println("\n✅ Payment Successful via " + paymentType + "!");
        generateTicket(selected, seats, totalAmount, paymentType);

        sc.close();
    }

    // Generate final ticket/receipt
    public static void generateTicket(Bus bus, int seats, double total, String paymentMethod) {
        System.out.println("\n🎟️ --------- TICKET GENERATED ---------");
        System.out.println("✅ BOOKING CONFIRMED!");
        System.out.println("🚌 Bus ID      : " + bus.id);
        System.out.println("📍 From        : " + bus.source);
        System.out.println("🎯 To          : " + bus.destination);
        System.out.println("📅 Date & Time : " + bus.date + " @ " + bus.time);
        System.out.println("🪑 Seat(s)     : " + seats);
        System.out.println("🧊 Bus Type    : " + (bus.isAC ? "AC" : "Non-AC"));
        System.out.println("💵 Fare        : ₹" + bus.fare + " x " + seats + " = ₹" + total);
        System.out.println("💳 Payment     : " + paymentMethod);
        System.out.println("--------------------------------------");
        System.out.println("📌 Please arrive 30 mins early. Safe Journey!\n");
    }
}
