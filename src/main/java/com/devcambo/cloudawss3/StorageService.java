package com.devcambo.cloudawss3;

import io.awspring.cloud.s3.S3Template;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final S3Template s3Template;

    @SneakyThrows
    public void save(@NonNull final MultipartFile file) {
        final var key = file.getOriginalFilename();
        final var bucketName = "my-bucket";
        s3Template.upload(bucketName, key, file.getInputStream());
    }

}
