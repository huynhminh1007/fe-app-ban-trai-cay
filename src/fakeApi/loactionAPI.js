$(document).ready(function () {
    // Lấy tỉnh thành
    $.getJSON('https://esgoo.net/api-tinhthanh-new/1/0.htm', function (data_tinh) {
        if (data_tinh.error == 0) {
            $.each(data_tinh.data, function (key_tinh, val_tinh) {
                $("#tinh").append(
                    '<option value="' + val_tinh.id + '">' + val_tinh.full_name + '</option>'
                );
            });

            $("#tinh").change(function () {
                var idtinh = $(this).val();

                // Lấy quận / huyện
                $.getJSON('https://esgoo.net/api-tinhthanh-new/2/' + idtinh + '.htm', function (data_quan) {
                    if (data_quan.error == 0) {
                        $("#quan").html('<option value="0">Phường Xã</option>');
                        $.each(data_quan.data, function (key_quan, val_quan) {
                            $("#quan").append(
                                '<option value="' + val_quan.id + '">' + val_quan.full_name + '</option>'
                            );
                        });
                    }
                });
            });
        }
    });
});
