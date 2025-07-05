const isVendor = (req, res, next) => {
    if (req.user.role !== "Vendor") {
        return res.status(403).json({ message: 'Access denied. Only vendors can enter.' });
    }
    next();
};

module.exports={
    isVendor
}